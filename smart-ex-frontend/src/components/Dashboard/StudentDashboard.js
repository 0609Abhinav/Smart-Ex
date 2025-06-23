import React from 'react';

const StudentDashboard = () => {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Welcome to Smart EX Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Points</h2>
          <p className="text-3xl">150</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Badges</h2>
          <p>Beginner, Advanced</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
