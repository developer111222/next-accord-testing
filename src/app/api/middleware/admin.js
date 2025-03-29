import { authorize } from "@/middleware/auth";

export async function GET(req) {
    const authUser = await authorize("admin")(req);
    if (!authUser) return Response.json({ msg: "Access Denied" }, { status: 403 });

    return Response.json({ message: "Welcome, Admin!" }, { status: 200 });
}
