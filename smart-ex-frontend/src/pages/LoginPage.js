import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaLinkedin } from 'react-icons/fa';

const LoginPage = ({ setIsLoggedIn }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  console.log(credentials);
  console.log("changes done");

  if (credentials.email && credentials.password) {
    try {
      console.log("inside if statement");
      const res = await fetch('http://localhost:5000/api/validateuser', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      console.log("Response status:", res.status);

      if (res.status === 200) {
        setIsLoggedIn(true);
        navigate('/test');
      } else if (res.status === 500) {
        alert("Invalid credentials!");
      } else {
        alert("Unexpected error occurred.");
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred while logging in.");
    }
  } else {
    alert('Invalid login details!');
  }
};


  const handleSocialLogin = (platform) => {
    // This function simulates a social login
    console.log(`Logging in with ${platform}`);
    setIsLoggedIn(true);
    navigate('/test');
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-96 space-y-6"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gradient">
          Login to Your Account
        </h2>

        {/* Login Form */}
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-all duration-300"
          >
            Login
          </button>
        </div>

        {/* Social Login Options */}
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600">Or login with</p>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleSocialLogin('Google')}
              className="w-full bg-red-500 text-white py-3 rounded-md flex items-center justify-center hover:bg-red-600 transition-all duration-300"
            >
              <FaGoogle className="mr-3 text-xl" />
              Google
            </button>

            <button
              onClick={() => handleSocialLogin('Facebook')}
              className="w-full bg-blue-600 text-white py-3 rounded-md flex items-center justify-center hover:bg-blue-700 transition-all duration-300"
            >
              <FaFacebook className="mr-3 text-xl" />
              Facebook
            </button>

            <button
              onClick={() => handleSocialLogin('LinkedIn')}
              className="w-full bg-blue-700 text-white py-3 rounded-md flex items-center justify-center hover:bg-blue-800 transition-all duration-300"
            >
              <FaLinkedin className="mr-3 text-xl" />
              LinkedIn
            </button>
          </div>
        </div>

        {/* Signup Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
