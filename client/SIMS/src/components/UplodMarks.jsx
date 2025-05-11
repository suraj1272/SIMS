import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UplodMarks = () => {
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [sem, setSem] = useState("");
  const [div, setDiv] = useState("");
  const [subject, setSubject] = useState("");
  const [examType, setExamType] = useState("");
  const [marksData, setMarksData] = useState([]);

  // Fetch subjects on component mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/getSubjects")
      .then((response) => {
        setSubjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching subjects:", error);
        toast.error("Failed to fetch subjects.");
      });
  }, []);

  // Fetch students when semester and division are selected
  const fetchStudents = () => {
    if (sem && div) {
      axios
        .get("http://localhost:5000/getStudentsBySemAndDiv", {
          params: { sem, div },
        })
        .then((response) => {
          setStudents(response.data);
          const initialMarksData = response.data.map((student) => ({
            usn: student.usn,
            subject: subject,
            examType: examType,
            marks: "",
          }));
          setMarksData(initialMarksData);
        })
        .catch((error) => {
          console.error("Error fetching students:", error);
          toast.error("Failed to fetch students.");
        });
    } else {
      toast.error("Please select both semester and division.");
    }
  };

  // Handle marks input change
  const handleMarksChange = (index, value) => {
    const updatedMarksData = [...marksData];
    updatedMarksData[index].marks = value;
    setMarksData(updatedMarksData);
  };

  // Submit marks
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/addMarks", { marksData })
      .then((response) => {
        toast.success("Marks added successfully!");
        setSem("");
        setDiv("");
        setSubject("");
        setExamType("");
        setStudents([]);
        setMarksData([]);
      })
      .catch((error) => {
        console.error("Error adding marks:", error);
        toast.error("Failed to add marks.");
      });
  };

  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-r from-amber-100 via-purple-100 to-red-100">
      <div className="w-full max-w-6xl bg-white p-10 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Upload Marks
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Semester */}
          <div>
            <label htmlFor="sem" className="block font-medium text-gray-700">
              Semester
            </label>
            <select
              id="sem"
              value={sem}
              onChange={(e) => setSem(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required>
              <option value="">Select Semester</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
          </div>

          {/* Division */}
          <div>
            <label htmlFor="div" className="block font-medium text-gray-700">
              Division
            </label>
            <select
              id="div"
              value={div}
              onChange={(e) => setDiv(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required>
              <option value="">Select Division</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="subject"
              className="block font-medium text-gray-700">
              Subject
            </label>
            <select
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required>
              <option value="">Select Subject</option>
              {subjects.map((sub) => (
                <option key={sub._id} value={sub.subTitle}>
                  ({sub.subCode}) {sub.subTitle}
                </option>
              ))}
            </select>
          </div>

          {/* Exam Type */}
          <div>
            <label
              htmlFor="examType"
              className="block font-medium text-gray-700">
              Exam Type
            </label>
            <select
              id="examType"
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required>
              <option value="">Select Exam Type</option>
              <option value="CIE 1">CIE 1</option>
              <option value="CIE 2">CIE 2</option>
              <option value="SEE">SEE</option>
            </select>
          </div>

          {/* Fetch Students Button */}
          <button
            type="button"
            onClick={fetchStudents}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-lg transition duration-200">
            Fetch Students
          </button>

          {/* Students and Marks */}
          {students.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Enter Marks
              </h3>
              <table className="w-full border border-gray-300 rounded-lg">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-2 px-4 border">USN</th>
                    <th className="py-2 px-4 border">Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student._id}>
                      <td className="py-2 px-4 border">{student.usn}</td>
                      <td className="py-2 px-4 border">
                        <input
                          type="number"
                          value={marksData[index]?.marks || ""}
                          onChange={(e) =>
                            handleMarksChange(index, e.target.value)
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                          required
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Submit Button */}
          {students.length > 0 && (
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg transition duration-200">
              Submit Marks
            </button>
          )}
        </form>
      </div>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default UplodMarks;
