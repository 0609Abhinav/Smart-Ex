import React, { useState, useEffect } from "react";
import { FaUserCircle, FaClock, FaPlusCircle, FaCertificate } from "react-icons/fa";
import { motion } from "framer-motion";

const StudentPanel = ({ user }) => {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [student, setStudent] = useState(null);
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [examHistory, setExamHistory] = useState([]);

  useEffect(() => {
    if (user) {
      setStudent(user);
      fetch(`/api/upcoming-exams?studentId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setUpcomingExams(data));
      
      fetch(`/api/exam-history?studentId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setExamHistory(data));
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
      <div className="p-6 flex justify-between items-center shadow-lg bg-opacity-80 backdrop-blur-md">
        <h1 className="text-3xl font-bold">AI Proctor Examination - Student Panel</h1>
        <div className="flex items-center space-x-3">
          <FaUserCircle size={30} />
          <span className="text-lg">{student?.name}</span>
        </div>
      </div>

      <div className="flex justify-center bg-opacity-80 backdrop-blur-md py-4 space-x-8 border-b-2 border-white">
        {["dashboard", "liveExam", "examHistory", "certificates", "profile"].map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setCurrentTab(tab)}
            whileHover={{ scale: 1.1 }}
            className={`font-semibold text-xl transition duration-300 ${currentTab === tab ? "text-blue-300 border-b-4 border-blue-300" : "text-white"}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </motion.button>
        ))}
      </div>

      <div className="p-8">
        {currentTab === "dashboard" && (
          <div>
            <h2 className="text-3xl font-semibold mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div className="bg-white text-black p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-3 flex items-center space-x-2">
                  <FaClock /> <span>Upcoming Exams</span>
                </h3>
                <ul>
                  {upcomingExams.map((exam) => (
                    <li key={exam.id} className="flex justify-between items-center border-b py-3">
                      <span>{exam.subject} ({exam.level})</span>
                      <span>{exam.date} - {exam.time}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition duration-300">
                  <FaPlusCircle /> <span>Add Exam</span>
                </button>
              </motion.div>
              <motion.div className="bg-white text-black p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-3">Student Information</h3>
                <p><strong>Name: abhinavtripathi6sep@gmail.com</strong> {student?.name}</p>
                <p><strong>Roll Number:2200560139001</strong> {student?.rollNumber}</p>
                <p><strong>Course:B.tech</strong> {student?.course}</p>
                <p><strong>Year:4th</strong> {student?.year}</p>
              </motion.div>
            </div>
          </div>
        )}

        {currentTab === "examHistory" && (
          <motion.div>
            <h2 className="text-3xl font-semibold mb-6">Exam History</h2>
            <table className="min-w-full bg-white text-black rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-left">Subject</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Score</th>
                  <th className="p-4 text-left">Level</th>
                  <th className="p-4 text-left">Language</th>
                </tr>
              </thead>
              <tbody>
                {examHistory.map((exam) => (
                  <tr key={exam.id} className="border-t">
                    <td className="p-4">{exam.subject}</td>
                    <td className="p-4">{exam.date}</td>
                    <td className="p-4">{exam.score}</td>
                    <td className="p-4">{exam.level}</td>
                    <td className="p-4">{exam.language}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {currentTab === "certificates" && (
          <motion.div>
            <h2 className="text-3xl font-semibold mb-6">Certificates</h2>
            {examHistory.filter(exam => exam.score === "50/50").map((exam) => (
              <div key={exam.id} className="bg-white text-black p-6 rounded-lg shadow-lg mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">{exam.subject} - {exam.level}</h3>
                  <p>Congratulations! You have scored full marks in {exam.language}.</p>
                </div>
                <motion.button
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <FaCertificate className="inline-block mr-2" /> Download Certificate
                </motion.button>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StudentPanel;
