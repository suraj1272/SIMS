import axios from "axios";
import { useEffect, useState } from "react";

const ViewMarks = () => {
  const [marks, setMarks] = useState([]);
  const usn = localStorage.getItem("usn"); // Get the logged-in student's USN

  useEffect(() => {
    // Fetch marks for the logged-in student
    axios
      .get(`http://localhost:5000/getMarks/${usn}`)
      .then((response) => {
        setMarks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching marks:", error);
      });
  }, [usn]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Your Marks
        </h2>
        {marks.length > 0 ? (
          <table className="min-w-full border text-sm">
            <thead className="bg-indigo-200 text-indigo-900">
              <tr>
                <th className="py-2 px-4 border text-left">Subject</th>
                <th className="py-2 px-4 border text-left">Exam Type</th>
                <th className="py-2 px-4 border text-left">Marks</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((mark) => (
                <tr key={mark._id} className="hover:bg-indigo-50">
                  <td className="py-2 px-4 border">{mark.subject}</td>
                  <td className="py-2 px-4 border">{mark.examType}</td>
                  <td className="py-2 px-4 border">{mark.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-600">No marks available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewMarks;
