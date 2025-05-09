import axios from "axios";
import React, { useEffect, useState } from "react";

const ViewQp = () => {
  const [questionPapers, setQuestionPapers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/getAllQp")
      .then((response) => {
        console.log("Fetched question papers:", response.data);
        setQuestionPapers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching question papers:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Uploaded Question Papers
        </h2>

        {questionPapers.length > 0 ? (
          <table className="min-w-full border text-sm">
            <thead className="bg-indigo-200 text-indigo-900">
              <tr>
                <th className="py-2 px-4 border">Title</th>
                <th className="py-2 px-4 border">Uploaded Date</th>
                <th className="py-2 px-4 border">Download</th>
              </tr>
            </thead>
            <tbody>
              {questionPapers.map((qp) => (
                <tr key={qp._id} className="hover:bg-indigo-50">
                  <td className="py-2 px-4 border">{qp.title}</td>
                  <td className="py-2 px-4 border">
                    {new Date(qp.uploadDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">
                    <a
                      href={`http://localhost:5000/${qp.filepath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium underline">
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-600">No question papers found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewQp;
