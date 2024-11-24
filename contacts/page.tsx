'use client';

import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setError("All fields are required!");
      return;
    }

    setError(""); 
    setIsSubmitted(true);

    console.log(formData);

    
    setTimeout(() => {
      setIsSubmitted(false); 
    }, 3000);
  };

  return (
    <>
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-1"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-1"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-semibold">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-1"
              placeholder="Enter your message"
              rows={4}
            ></textarea>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
          >
            {isSubmitted ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Contact;
