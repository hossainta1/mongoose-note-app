import { Model, model, Schema } from "mongoose";
import {
  IAddress,
  IUser,
  UserInstanceMethod,
  UserStaticMethod,
} from "../interfaces/user.interface";
import validator from "validator";

import bcrypt from "bcryptjs";
import { Note } from "./notes.model";

const addressSchema = new Schema<IAddress>(
  {
    city: { type: String },
    street: { type: String },
    zip: { type: Number },
  },
  {
    _id: false,
  }
);

const userSchema = new Schema<IUser, UserStaticMethod, UserInstanceMethod>(
  {
    firstName: {
      type: String,
      required: [true, "Must be input the first name"],
      trim: true,
      minlength: 5,
      maxlength: 10,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
      min: [18, "Must be at least 6, got {VALUE}"],
      max: 60,
    },

    email: {
      type: String,
      unique: [true, "Email must be unique"],
      required: true,
      trim: true,
      //  validate: {
      //         validator: function (value) {
      //             return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      //         },
      //         message: function (props) {
      //             return `Email ${props.value} is not valid email`
      //         }
      //     }
      validate: [validator.isEmail, "Invalid Email sent {VALUE}"],
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      uppercase: true,
      enum: {
        values: ["USER", "ADMIN", "SUPERADMIN"],
        message: "Role is not valid, got {VALUE} role",
      },
      default: "USER",
    },

    address: {
      type: addressSchema,
    },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.method("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});

userSchema.static("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});

// pre hooks

// document middleware

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next()
});

// query middleware

userSchema.pre("find", function (next) {
  next()

});

// post hook
userSchema.post("save", function (doc, next) {
  console.log(`${doc.email} has been saved`);
  next()
});

// Query middleware
userSchema.post("findOneAndDelete", async function (doc, next) {
  if (doc) {
    await Note.deleteMany({ user: doc._id });
  }
  next()
});

export const User = model<IUser, UserStaticMethod>("User", userSchema);
