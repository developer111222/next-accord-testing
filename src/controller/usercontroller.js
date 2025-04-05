import User from "@/model/userschema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import DBConnection from "@/utils/Database";
import { cookies } from "next/headers";

export async function createUser(body) {
    await DBConnection();
    try {
        const { email, password, role } = body;

        if (!email || !password || !role) {
            return Response.json({ msg: "Please provide email, password," }, { status: 400 });
        }

        const existUser = await User.findOne({ email });
        if (existUser) {
            return Response.json({ msg: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, role });
        await newUser.save();

        return Response.json({ message: "User signed up successfully" }, { status: 201 });
    } catch (error) {
        return Response.json({ message: "Server error", error: error.message }, { status: 500 });
    }
}

export async function loginUser(body) {
    await DBConnection();
    try {
        const { email, password } = body;

        if (!email || !password) {
            return Response.json({ msg: "Please provide email and password" }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return Response.json({ msg: "Invalid credentials" }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return Response.json({ msg: "Invalid credentials" }, { status: 401 });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role }, // Include role in token
            "sdkufhdskjgdkjghdfkjgfdhkgjffjkdghdfgjkfdl",
            { expiresIn: "1d" }
        );
        const cookieStore = await cookies();
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000,
            path: "/",
        });

        // cookies().set("token", token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === "production",
        //     sameSite: "Strict",
        //     maxAge: 24 * 60 * 60,
        //     path: "/",
        // });

        return Response.json({ message: "Login successful" }, { status: 200 });
    } catch (error) {
        return Response.json({ message: "Server error", error: error.message }, { status: 500 });
    }
}

export async function logout() {
    cookies().delete("token");
    return Response.json({ message: "Logged out" }, { status: 200 });
}

export async function getProfile(user) {
  try {
    
      return Response.json(user); // ✅ Return the user directly
  } catch (error) {
      console.error(error);
      return Response.json({ message: "Server Error" }, { status: 500 });
  }
}

