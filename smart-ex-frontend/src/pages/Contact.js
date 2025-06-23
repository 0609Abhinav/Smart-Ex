import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const Contact = () => {
  // State to store form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Check if the form is filled
  const isFormValid = name && email && message;

  return (
    <section className="py-16 bg-gray-800 text-white">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-semibold text-center mb-8 text-gradient bg-clip-text">
          Get in Touch
        </h2>

        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Developer Info Column */}
          <div className="flex-1 space-y-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600">
                Developer Information
              </h3>
              <p className="text-lg text-gray-400 mt-2">Abhinav Tripathi</p>
              <p className="text-lg text-gray-400">Email: abhinavtripathi6sep@gmail.com</p>
              <p className="text-lg text-gray-400">Location: India</p>
              <p className="text-lg text-gray-400">
                Tech Stack: React, Node.js, Express, MongoDB, Tailwind CSS, AWS
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex justify-center space-x-6">
              <a
                href="https://github.com/0609Abhinav"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-400 hover:text-white transition transform hover:scale-110"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/abhinav-tripathi-12345/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-400 hover:text-white transition transform hover:scale-110"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://twitter.com/Abhinav_0609"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-400 hover:text-white transition transform hover:scale-110"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/abhinav_0609/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-400 hover:text-white transition transform hover:scale-110"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="flex-1 bg-gray-700 p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold text-center mb-4 text-gradient bg-clip-text">
              Contact Me
            </h3>
            <form className="space-y-6">
              <div className="relative">
                <label htmlFor="name" className="block text-lg text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="relative">
                <label htmlFor="email" className="block text-lg text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <label htmlFor="message" className="block text-lg text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full px-4 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  placeholder="Your Message"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {/* Send Message Button */}
              <a
                href={`mailto:abhinavtr@gmail.com?subject=Contact Form Submission&body=Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`}
                className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition transform hover:scale-105 block text-center ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!isFormValid}
              >
                Send Message
              </a>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
