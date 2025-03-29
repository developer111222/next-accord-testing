"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface LoginFormData {
  email: string;
  password: string;
}

const Page: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({ email: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); 
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Submitting Form:", formData);
  
  //   setLoading(true);
  //   setError(null);
  
  //   try {
  //     const response = await axios.post("/api/users", formData, {
  //       headers: { "Content-Type": "application/json" }, // ✅ Ensure correct content type
  //     });
  //     console.log("Login successful:", response.data);
  //     router.push("/profile");
  //   } catch (err: any) {
  //     console.error("API Error:", err.response);
  //     setError(err.response?.data?.msg || "Login failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Form:", formData);
  
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("/api/users", {
        email: formData.email,
        password: formData.password,
        login: true, // <-- This tells the backend to handle login
      });
      console.log("Login successful:", response.data);
      router.push("/profile");
    } catch (err: any) {
      console.error("API Error:", err.response);
      setError(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form 
        onSubmit={handleLogin} 
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full p-2 border rounded mb-3"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Page;
