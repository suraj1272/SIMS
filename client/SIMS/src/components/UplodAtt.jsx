import axios from "axios";
import { useEffect, useState } from "react";

function UplodAtt() {
  const [sem, setSem] = useState("");
  const [div, setDiv] = useState("");
  const [sub, setSub] = useState([]);
  const [selectedSub, setSelectedSub] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/viewSub")
      .then((response) => {
        console.log("Subjects fetched:", response.data);
        setSub(response.data);
      })
      .catch((error) => {
        console.error("Error fetching subjects:", error);
      });
  }, []);

  const fetchStudent = () => {
    if (!selectedSub || !div || !sem) {
      alert("Please fill all the fields");
      return;
    }
    axios
      .get("http://localhost:5000/getStudentsBySemAndDiv", {
        params: { sem, div },
      })
      .then((response) => {
        setStudents(response.data);
        const initialAttendance = {};
        response.data.forEach((student) => {
          initialAttendance[student.usn] = "Absent";
        });
        setAttendance(initialAttendance);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  };

  const handleSubmit = (usn, status) => {
    setAttendance((prev) => ({ ...prev, [usn]: status }));
  };

  const saveAttendance = () => {
    if (!selectedSub) {
      alert("Please select a subject");
      return;
    }
    const attendanceData = students.map((student) => ({
      usn: student.usn,
      name: `${student.fname} ${student.lname}`,
      status: attendance[student.usn],
    }));
    axios
      .post("http://localhost:5000/uplodAtd", {
        sem,
        div,
        subject: selectedSub,
        students: attendanceData,
      })
      .then((response) => {
        alert("Attendance uploaded successfully");
      })
      .catch((error) => {
        console.error("Error saving attendance:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-pink-100 to-red-100 p-4">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Upload Attendance
        </h2>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Semester
            </label>
            <select
              value={sem}
              onChange={(e) => setSem(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2">
              <option value="">Select</option>
              {[...Array(8)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Division
            </label>
            <select
              value={div}
              onChange={(e) => setDiv(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2">
              <option value="">Select</option>
              {["A", "B", "C", "D"].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <select
              value={selectedSub}
              onChange={(e) => setSelectedSub(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2">
              <option value="">Select</option>
              {sub.map((subject) => (
                <option key={subject._id} value={subject.subTitle}>
                  {subject.subTitle} ({subject.subCode})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <button
            onClick={fetchStudent}
            className="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600 transition">
            Fetch Students
          </button>
        </div>

        {students.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Mark Attendance
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="py-2 px-4 border">USN</th>
                    <th className="py-2 px-4 border">Name</th>
                    <th className="py-2 px-4 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.usn} className="text-gray-800">
                      <td className="py-2 px-4 border">{student.usn}</td>
                      <td className="py-2 px-4 border">{`${student.fname} ${student.lname}`}</td>
                      <td className="py-2 px-4 border">
                        <div className="flex gap-4">
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name={`attendance-${student.usn}`}
                              value="Present"
                              checked={attendance[student.usn] === "Present"}
                              onChange={() =>
                                handleSubmit(student.usn, "Present")
                              }
                            />
                            Present
                          </label>
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name={`attendance-${student.usn}`}
                              value="Absent"
                              checked={attendance[student.usn] === "Absent"}
                              onChange={() =>
                                handleSubmit(student.usn, "Absent")
                              }
                            />
                            Absent
                          </label>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={saveAttendance}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition">
                Save Attendance
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UplodAtt;
