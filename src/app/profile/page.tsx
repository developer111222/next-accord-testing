"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface UserProfile {
  username?: string;
  email: string;
  role: string;
}

const Page: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("/api/users");
      setUser(response.data);
    } catch (err: any) {
      console.error("Error fetching user profile:", err.response);
      // router.push("/"); // ✅ Redirect to login if not authenticated
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/users", { logout: true });
      setUser(null);
      router.push("/"); // ✅ Redirect to login after logout
    } catch (err: any) {
      console.error("Logout error:", err.response);
    }
  };

  if (!user) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Welcome, {user.username || "User"}!</h2>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded mt-4 hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Page;
