import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ isLoggedIn }) => {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">


      {/* Hero Section */}
      <section className="hero bg-cover bg-center relative" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?education,exam')" }}>
        <div className="overlay bg-black bg-opacity-50 absolute inset-0"></div>
        <div className="container mx-auto text-center relative z-10 py-32">
          <h2 className="text-5xl font-bold text-white mb-4 animate-fade-in">Secure Your Online Exams with AI</h2>
          <p className="text-lg text-white mb-8">
            Real-Time Monitoring and Intelligent Analysis for Unmatched Exam Integrity.
          </p>
          <Link to={isLoggedIn ? "/test" : "/login"} className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg hover:bg-blue-500 hover:text-white transition duration-300">
            {isLoggedIn ? "Start Test" : "Get Started"}
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-semibold mb-12">Our Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="mb-4">
                <i className="fas fa-video text-blue-600 text-4xl"></i>
              </div>
              <h4 className="text-2xl font-bold mb-2">Live AI Monitoring</h4>
              <p className="text-gray-600">
                Real-time AI-powered monitoring of candidates during online exams for cheating prevention.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="mb-4">
                <i className="fas fa-user-check text-blue-600 text-4xl"></i>
              </div>
              <h4 className="text-2xl font-bold mb-2">Identity Verification</h4>
              <p className="text-gray-600">
                Verify student identity with advanced facial recognition and fraud detection tools.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="mb-4">
                <i className="fas fa-chart-line text-blue-600 text-4xl"></i>
              </div>
              <h4 className="text-2xl font-bold mb-2">Performance Analytics</h4>
              <p className="text-gray-600">
                Comprehensive performance reports and analytics for exam integrity and transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6">Ready to Experience Next-Level Exam Security?</h3>
          <p className="text-lg mb-6">
            Join us now and ensure that your exams are secure, credible, and seamless.
          </p>
          <Link to={isLoggedIn ? "/test" : "/register"} className="bg-white text-blue-600 px-8 py-3 rounded-lg shadow-lg hover:bg-blue-500 hover:text-white transition duration-300">
            {isLoggedIn ? "Start Now" : "Sign Up Now"}
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
