import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role:{
      type: String,
      enum: ["admin", "user"],
      default: "user" // Default role for new users is "user"
    }
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema); // ✅ Fix OverwriteModelError

export default User;
