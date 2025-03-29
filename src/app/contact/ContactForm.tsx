'use client';

import { useEffect, useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Replace with your API URL
      const response = await fetch('https://mrishi.onrender.com/api/acc-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again later.');
      }

      const result = await response.json();

      // Handle success
      setSuccessMessage('Your message has been sent successfully!');
      setFormData({
        firstName: '',
        email: '',
        phone: '',
        message: ''
      });

    } catch (error) {
      // Handle error
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
          className="w-full px-4 py-3 text-white placeholder-gray-500 bg-black border-b-2 border-white outline-none"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full px-4 py-3 text-white placeholder-gray-500 bg-black border-b-2 border-white outline-none"
        />

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="w-full px-4 py-3 text-white placeholder-gray-500 bg-black border-b-2 border-white outline-none"
        />

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows={2}
          required
          className="w-full px-4 py-3 text-white placeholder-gray-500 bg-black border-b-2 border-white outline-none resize-y"
        ></textarea>

        <button
          type="submit"
          className="w-full py-3 px-4 text-white border-2 border-white rounded-full hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-black transition-colors duration-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4 lg-text">{error}</p>}
      {successMessage && <p className="text-green-500 mt-4 lg-text">{successMessage}</p>}
    </div>
  );
}
