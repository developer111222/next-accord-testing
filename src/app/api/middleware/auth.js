import jwt from "jsonwebtoken";
import User from "@/model/userschema";

// Function to authenticate user by verifying the JWT token
export async function authenticate(req) {
    try {
        // ✅ Get cookies from the request headers
        const cookieHeader = req.headers.get("cookie");
        if (!cookieHeader) return { status: 401, msg: "Unauthorized: No cookies found" };

        // ✅ Parse cookies (Extract `token`)
        const cookies = Object.fromEntries(cookieHeader.split("; ").map(c => c.split("=")));
        const token = cookies.token;

        if (!token) return { status: 401, msg: "Unauthorized: Token not found" };

        // ✅ Verify and Decode JWT Token
        const decoded = jwt.verify(token, "sdkufhdskjgdkjghdfkjgfdhkgjffjkdghdfgjkfdl");

        // ✅ Fetch User from Database
        const user = await User.findById(decoded.id).select("username email role");
        if (!user) return { status: 401, msg: "Unauthorized: User not found" };

        return { status: 200, user }; // ✅ Return user object
    } catch (error) {
        console.error("Authentication Error:", error);
        return { status: 403, msg: "Forbidden: Invalid token" }; // Return forbidden if token verification fails
    }
}

// Function to authorize user based on their role
export function authorize(requiredRole) {
    return async (req) => {
        const auth = await authenticate(req);  // We need to wait for the result from `authenticate`
        
        if (auth.status !== 200) {
            return { status: auth.status, msg: auth.msg }; // If authentication fails, return the error
        }

        // Check if user has the required role
        if (auth.user.role !== requiredRole) {
            return { status: 403, msg: "Access Denied: Insufficient role" };
        }

        return { status: 200, user: auth.user }; // Authorized user, proceed with request
    };
}
