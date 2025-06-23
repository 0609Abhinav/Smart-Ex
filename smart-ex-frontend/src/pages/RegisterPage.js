import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [details, setDetails] = useState({
    name: '',
    email: '',
    password: '',
    rollNumber: '',
    branch: '',
    course: '',
    dob: '',
    year: '',
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg px-4 sm:px-6 md:px-8 lg:px-12">
        <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Register</h2>

          {["name", "email", "password", "rollNumber", "branch", "course"].map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : field === "password" ? "password" : "text"}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="w-full p-3 mb-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={(e) => setDetails({ ...details, [field]: e.target.value })}
              required
            />
          ))}

          {/* Date of Birth */}
          <input
            type="date"
            className="w-full p-3 mb-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onChange={(e) => setDetails({ ...details, dob: e.target.value })}
            required
          />

          {/* Year */}
          <select
            className="w-full p-3 mb-6 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onChange={(e) => setDetails({ ...details, year: e.target.value })}
            required
          >
            <option value="">Select Year</option>
            <option value="1st">1st Year</option>
            <option value="2nd">2nd Year</option>
            <option value="3rd">3rd Year</option>
            <option value="4th">4th Year</option>
          </select>

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
