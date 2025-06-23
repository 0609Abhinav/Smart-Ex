import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout";
import AdminPanel from "./pages/AdminPanel";
import HomePage from "./pages/HomePage";
import FeaturePage from "./pages/FeaturePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TestPage from "./pages/TestPage";
import AboutUs from "./pages/AboutUs";
import StudentDashboard from "./pages/StudentDashboard";
import Contact from "./pages/Contact"; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state

  return (
    <Router>
      <Routes>
        {/* Public Route - Home Page */}
        <Route
          path="/"
          element={
            <Layout isLoggedIn={isLoggedIn}>
              <HomePage isLoggedIn={isLoggedIn} />
            </Layout>
          }
        />

        {/* Redirect logged-in users from Login page */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/test" replace />
            ) : (
              <Layout isLoggedIn={isLoggedIn}>
                <LoginPage setIsLoggedIn={setIsLoggedIn} />
              </Layout>
            )
          }
        />

        {/* Redirect logged-in users from Register page */}
        <Route
          path="/register"
          element={
            isLoggedIn ? (
              <Navigate to="/test" replace />
            ) : (
              <Layout isLoggedIn={isLoggedIn}>
                <RegisterPage />
              </Layout>
            )
          }
        />

        {/* Protected Route - Test Page */}
        <Route
          path="/test"
          element={
            isLoggedIn ? (
              <Layout isLoggedIn={isLoggedIn}>
                <TestPage />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Public Route - About Us */}
        <Route
          path="/about-us"
          element={
            <Layout isLoggedIn={isLoggedIn}>
              <AboutUs />
            </Layout>
          }
        />

        {/* Protected Route - Student Dashboard */}
        <Route
          path="/StudentDashboard"
          element={
            isLoggedIn ? (
              <Layout isLoggedIn={true}>
                <StudentDashboard />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Public Route - Feature Page */}
        <Route
          path="/features"
          element={
            <Layout isLoggedIn={isLoggedIn}>
              <FeaturePage />
            </Layout>
          }
        />

        {/* Public Route - Contact */}
        <Route
          path="/contact"
          element={
            <Layout isLoggedIn={isLoggedIn}>
              <Contact />
            </Layout>
          }
        />

<Route
  path="/admin"
  element={
    // <Layout isLoggedIn={isLoggedIn}>
    //   <AdminPanel />
    // </Layout>
     <Layout>
    <AdminPanel />
  </Layout>
  }
/>

        {/* Redirect invalid paths to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
