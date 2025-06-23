import React, { useState, useEffect } from "react";
import { FaRobot } from "react-icons/fa";
import { IoIosRocket } from "react-icons/io";

const AboutUs = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Fetching an image using Unsplash API
    fetch("https://api.unsplash.com/photos/random?query=ai,technology&client_id=YOUR_ACCESS_KEY")
      .then((response) => response.json())
      .then((data) => {
        setImage(data[0]?.urls?.regular);
      });

    // Start the floating animation for AI circles after component mounts
    const floatingCircles = document.querySelectorAll(".floating-circle");
    floatingCircles.forEach((circle, index) => {
      const animationDelay = index * 0.5;
      circle.style.animationDelay = `${animationDelay}s`;
    });
  }, []);

  return (
    <div className="bg-gray-900 text-white overflow-hidden relative">
      {/* Background Animation */}
      <div className="absolute w-full h-full top-0 left-0 z-0">
        <div className="absolute w-80 h-80 bg-blue-500 rounded-full animate-ping opacity-50"></div>
        <div className="absolute w-96 h-96 bg-green-500 rounded-full animate-bounce opacity-30"></div>
      </div>

      {/* Content Wrapper */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        {/* Page Title */}
        <h1 className="text-5xl font-extrabold text-center mb-12 tracking-wide animate__animated animate__fadeIn animate__delay-1s">
          About Us
        </h1>

        {/* Smart Ex Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-6 text-gradient">
            Smart Ex: AI Proctoring Examination System
          </h2>
          <p className="text-lg text-center text-gray-300 leading-relaxed mb-6 animate__animated animate__fadeIn animate__delay-2s">
            Smart Ex is an AI-powered examination system designed to ensure secure and fair online assessments. Leveraging advanced AI algorithms to monitor students, it prevents cheating and maintains the integrity of online exams.
          </p>
        </section>

        {/* Developer Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-6 text-gradient">
            Developer
          </h2>
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
            <p className="text-lg">
              <strong className="text-xl font-bold text-yellow-400">Abhinav Tripathi</strong>
              <br />
              Developer of Smart Ex
              <br />
              Abhinav Tripathi is the developer behind Smart Ex, an innovative platform utilizing AI to revolutionize online assessments. With a passion for technology, Abhinav strives to create intelligent and efficient solutions.
            </p>
          </div>
        </section>

        {/* Guidance Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-6 text-gradient">
            Guidance
          </h2>
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
            <p className="text-lg">
              <strong className="text-xl font-bold text-red-400">Kamal Srivastava</strong>
              <br />
               Professor, Department of Information Technology
              <br />
              BBDNIIT, Lucknow
              <br />
              Kamal Srivastava, with years of experience in technology and education, has been instrumental in shaping the vision of Smart Ex.
            </p>
          </div>
        </section>

        {/* AI Animation Section */}
        <section className="relative mt-16 flex justify-center items-center">
          <div className="absolute w-full h-full top-0 left-0 z-10">
            <div className="floating-circle absolute w-40 h-40 bg-blue-400 rounded-full animate-spin"></div>
            <div className="floating-circle absolute w-32 h-32 bg-green-400 rounded-full animate-spin"></div>
            <div className="floating-circle absolute w-48 h-48 bg-pink-500 rounded-full animate-spin"></div>
          </div>
          <div className="relative z-20 text-center text-white">
            <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-300 animate__animated animate__fadeIn animate__delay-1s">
              Revolutionizing Online Assessments with AI
            </h2>
            <p className="text-lg mb-8 leading-relaxed animate__animated animate__fadeIn animate__delay-2s">
              With Smart Ex, we provide educational institutions with the tools to conduct online exams securely using AI. The platform ensures exam integrity while offering advanced monitoring features.
            </p>
            <div className="text-5xl text-yellow-400 animate__animated animate__pulse animate__infinite mb-6">
              <FaRobot className="inline-block mr-4" />
              <IoIosRocket className="inline-block" />
            </div>
            {/* Image fetched from Unsplash API */}
            {image ? (
              <img
                src={image}
                alt="AI and Technology"
                className="mt-8 mx-auto rounded-xl shadow-xl transform hover:scale-105 transition duration-300"
              />
            ) : (
              <p>Loading image...</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
