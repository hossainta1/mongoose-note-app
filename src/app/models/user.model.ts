import { model, Schema } from "mongoose";
import { IAddress, IUser } from "../interfaces/user.interface";
import validator from "validator";

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

const userSchema = new Schema<IUser>(
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

export const User = model("User", userSchema);
