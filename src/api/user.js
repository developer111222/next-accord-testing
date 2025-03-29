import { createuser,getuser } from "../controller/usercontroller";

export default async function handler(req, res) {
    if (req.method === "GET") {
      return getuser(req, res);
    } else if (req.method === "POST") {
      return createuser(req, res);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }