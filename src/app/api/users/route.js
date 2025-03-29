import { createUser, loginUser, logout, getProfile } from "@/controller/usercontroller";
import { authenticate } from '../middleware/auth'

export async function GET(req) {
  const user = await authenticate(req);

  if (!user) {
      return Response.json({ msg: "Unauthorized" }, { status: 401 });
  }

  return getProfile(user); // ✅ Pass user directly to `getProfile`
} 

export async function POST(req) {
    const body = await req.json();

    if (body.login) {
        return loginUser(body);
    } else if (body.logout) {
        return logout();
    } else {
        return createUser(body);
    }
}
