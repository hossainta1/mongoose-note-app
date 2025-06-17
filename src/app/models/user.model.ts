import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 10
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
  },

  age: {
    type: Number,
    required: true,
    min: [18, 'Must be at least 6, got {VALUE}'],
    max: 60,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    uppercase: true,
    enum: ["USER", "ADMIN", "SUPERADMIN"],
    default: "USER",
  },
});

export const User = model("User", userSchema);
