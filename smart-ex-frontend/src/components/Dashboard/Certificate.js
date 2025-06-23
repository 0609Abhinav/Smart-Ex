import React from 'react';
import html2pdf from 'html2pdf.js';

const Certificate = ({ studentName, score, testName }) => {
  const downloadCertificate = () => {
    const element = document.getElementById('certificate');
    html2pdf().from(element).save('Certificate.pdf');
  };

  return (
    <div>
      <div id="certificate" className="p-5 border rounded">
        <h1 className="text-2xl font-bold">Smart EX Certificate</h1>
        <p>Student: {studentName}</p>
        <p>Test: {testName}</p>
        <p>Score: {score}</p>
      </div>
      <button
        onClick={downloadCertificate}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Download Certificate
      </button>
    </div>
  );
};

export default Certificate;
