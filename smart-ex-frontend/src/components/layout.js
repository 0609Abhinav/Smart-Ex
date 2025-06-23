import React from "react";
import { Link, NavLink } from "react-router-dom";

const Layout = ({ children, isLoggedIn }) => {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Header (Navbar) */}
      <header className="bg-blue-600 p-4 text-white shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-3xl font-extrabold tracking-wide">
            <Link to="/">SmartEx</Link>
          </h1>

          {/* Navigation Links */}
          <nav>
            <ul className="flex space-x-8 font-medium">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-blue-400 hover:underline" : "hover:underline"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/features"
                  className={({ isActive }) =>
                    isActive ? "text-blue-400 hover:underline" : "hover:underline"
                  }
                >
                  Features
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive ? "text-blue-400 hover:underline" : "hover:underline"
                  }
                >
                  Admin Portal
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/StudentDashboard"
                  className={({ isActive }) =>
                    isActive ? "text-blue-400 hover:underline" : "hover:underline"
                  }
                >
                  Student Portal
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about-us"
                  className={({ isActive }) =>
                    isActive ? "text-blue-400 hover:underline" : "hover:underline"
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "text-blue-400 font-bold hover:underline" : "hover:underline"
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Authentication Buttons */}
          <div>
            {isLoggedIn ? (
              <Link
                to="/test"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Start Test
              </Link>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 p-6 text-white text-center">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-6">
            <div>
              <h5 className="text-xl font-semibold mb-4">Company</h5>
              <ul className="space-y-2">
                <li>
                  <Link to="/about-us" className="hover:text-blue-400">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="hover:text-blue-400">
                    Careers
                  </Link>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      isActive ? "text-blue-500 font-bold" : "hover:text-blue-400"
                    }
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-xl font-semibold mb-4">Support</h5>
              <ul className="space-y-2">
                <li>
                  <Link to="/help" className="hover:text-blue-400">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-blue-400">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-blue-400">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-xl font-semibold mb-4">Follow Us</h5>
              <ul className="flex justify-center space-x-6">
                <li>
                  <a
                    href="https://twitter.com"
                    className="hover:text-blue-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-twitter text-2xl"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com"
                    className="hover:text-blue-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin text-2xl"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com"
                    className="hover:text-blue-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github text-2xl"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <p className="text-sm">© 2024 SmartEx | All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;