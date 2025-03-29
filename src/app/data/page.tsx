"use client";
import { TextHoverEffect } from '@/component/TextHoverEffect';
import { useState } from 'react';

interface Product {
  _id: string;
  firstName: string;
  email: string;
  phone: number;
  message: string;
  created_at: string; // This should be a string representing the date
}

export default function Page() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState<{ apis: Product[] } | null>(null); // Initialize data as an object with apis array
  const [error, setError] = useState('');

  const correctPassword = 'yourPassword'; // The correct password to access the page

  // Fetch data from third-party API
  const fetchData = async () => {
    try {
      const response = await fetch('https://mrishi.onrender.com/api/acc-data'); // Replace with your third-party API URL
      const result = await response.json();
      setData(result); // Save the fetched data
    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (password === correctPassword) {
      setIsAuthenticated(true);
      fetchData(); // Fetch data after successful password check
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {!isAuthenticated ? (
        <div className="max-w-2xl mx-auto">
          <h1 className="text-white lg:text-5xl md:text-5xl">Enter Password</h1>
          <form onSubmit={handleSubmit} className="flex flex-col mt-5">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="border-2 rounded-full border-white p-4 text-white mb-10"
              required
            />
            <button type="submit" className="border-2 border-white lg:text-3xl rounded-full md:text-3xl text-white p-2">
              Submit
            </button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      ) : (
        <div>
          <TextHoverEffect text="DATA" />
         
          {data ? (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto bg-gray-800 text-white rounded-lg">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-700">First Name</th>
                    <th className="px-6 py-3 border-b border-gray-700">Email</th>
                    <th className="px-6 py-3 border-b border-gray-700">Phone</th>
                    <th className="px-6 py-3 border-b border-gray-700">Message</th>
                    <th className="px-6 py-3 border-b border-gray-700">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {data.apis.map((item) => (
                    <tr key={item._id} className="text-center">
                      <td className="px-6 py-3">{item.firstName}</td>
                      <td className="px-6 py-3">{item.email}</td>
                      <td className="px-6 py-3">{item.phone}</td>
                      <td className="px-6 py-3">{item.message}</td>
                      <td className="px-6 py-3">{new Date(item.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-white text-center lg:text-5xl md:text-5xl sm:text-5xl">Loading data...</p>
          )}
        </div>
      )}
    </div>
  );
}
