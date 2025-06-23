// FeaturePage.jsx
import { FaUserShield, FaEye, FaChartLine, FaClock, FaLock, FaLaptopCode } from "react-icons/fa";

const features = [
  {
    icon: <FaUserShield />,
    title: "AI-Powered Proctoring",
    description:
      "Advanced AI algorithms monitor and analyze student behavior in real-time to ensure a fair and secure examination environment.",
  },
  {
    icon: <FaEye />,
    title: "Real-Time Monitoring",
    description:
      "Track candidates via webcam and screen sharing with real-time alerts for suspicious activities.",
  },
  {
    icon: <FaChartLine />,
    title: "Comprehensive Reports",
    description:
      "Generate detailed reports with timestamps, behavior analysis, and exam performance for future review.",
  },
  {
    icon: <FaClock />,
    title: "Time Management",
    description:
      "Automated exam scheduling and time tracking ensure streamlined assessments with accurate time logs.",
  },
  {
    icon: <FaLock />,
    title: "Secure Environment",
    description:
      "Advanced encryption and multi-factor authentication provide a secure examination environment.",
  },
  {
    icon: <FaLaptopCode />,
    title: "Seamless Integration",
    description:
      "Easily integrates with existing LMS platforms for a smooth and hassle-free examination process.",
  },
];

const FeaturePage = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white p-8">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4 animate-fade-in">AI Proctored Smart Examination System</h1>
        <p className="text-lg max-w-2xl mx-auto opacity-75 animate-fade-in">
          Ensure secure, fair, and intelligent examination experiences with advanced AI technology.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 animate-slide-up">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            <div className="text-5xl mb-6 text-blue-400">{feature.icon}</div>
            <h2 className="text-2xl font-bold mb-4">{feature.title}</h2>
            <p className="opacity-80">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturePage;
