// models/User.js

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  user_type: {
    type: String,
    enum: ["admin", "teacher", "student"],
    required: true,
  },
  profilePicture: { type: String },
  isApproved: { type: Boolean, default: false },
});

export default mongoose.model("User", userSchema);
