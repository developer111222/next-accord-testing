import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema); // ✅ Fix OverwriteModelError

export default User;
