import jwt from "jsonwebtoken";
import User from "@/model/userschema";

// export function authenticate(req) {
//     const authHeader = req.headers.get("authorization");
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return { status: 401, msg: "Unauthorized" };
//     }

//     const token = authHeader.split(" ")[1];
//     try {
//         const decoded = jwt.verify(token, "sdkufhdskjgdkjghdfkjgfdhkgjffjkdghdfgjkfdl");
//         const user = await User.findById({ decoded.id })
//         if (!user) {
//             return res.status(401).json({ message: "User not found" });
//         }
//         req.user = user; // Attach the entire user object to the request


//         next();

//         return { status: 200, user: decoded };
//     } catch (error) {
//         return { status: 403, msg: "Forbidden" };
//     }
// }

export async function authenticate(req) {
    try {
        // ✅ Get cookies from the request headers
        const cookieHeader = req.headers.get("cookie"); 
        if (!cookieHeader) return null;

        // ✅ Parse cookies (Extract `token`)
        const cookies = Object.fromEntries(cookieHeader.split("; ").map(c => c.split("=")));
        const token = cookies.token; 

        if (!token) return null;

        // ✅ Verify and Decode JWT Token
        const decoded = jwt.verify(token, "sdkufhdskjgdkjghdfkjgfdhkgjffjkdghdfgjkfdl");

        // ✅ Fetch User from Database
        const user = await User.findById(decoded.id).select("username email role");
        if (!user) return null;

        return user; // ✅ Return User Object
    } catch (error) {
        console.error("Authentication Error:", error);
        return null;
    }
}

export function authorize(requiredRole) {
    return (req) => {
        const auth = authenticate(req);
        if (auth.status !== 200) return auth;
        if (auth.user.role !== requiredRole) {
            return { status: 403, msg: "Access Denied" };
        }
        return auth;
    };
}
