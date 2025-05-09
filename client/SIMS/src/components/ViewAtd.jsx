import axios from "axios";
import { useEffect, useState } from "react";

const ViewAtd = () => {
  const [attendance, setAttendance] = useState([]);
  const usn = localStorage.getItem("usn");

  useEffect(() => {
    axios
      .get("http://localhost:5000/getAttendanceByUsn", { params: { usn } })
      .then((response) => {
        setAttendance(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [usn]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Attendance Details
        </h2>

        {attendance.length > 0 ? (
          <table className="min-w-full text-sm text-left border border-gray-300 rounded-xl">
            <thead className="bg-indigo-200 text-indigo-900">
              <tr>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Subject</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((record) =>
                record.students
                  .filter(
                    (student) => student.usn.toLowerCase() === usn.toLowerCase()
                  )
                  .map((student) => (
                    <tr
                      key={`${record._id}-${student.usn}`}
                      className="hover:bg-indigo-50">
                      <td className="py-2 px-4 border">
                        {new Date(record.date).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border">{record.subject}</td>
                      <td
                        className={`py-2 px-4 border font-semibold ${
                          student.status === "Present"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}>
                        {student.status}
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 mt-6">
            No attendance records found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewAtd;
