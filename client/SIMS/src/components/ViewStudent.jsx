import axios from "axios";
import { useEffect, useState } from "react";

const ViewStudent = () => {
  const [students, setStudents] = useState([]);
  const [editStudentId, setEditStudentId] = useState(null);
  const [editedStudent, setEditedStudent] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/viewStudent")
      .then((response) => setStudents(response.data))
      .catch((error) => console.error("Error fetching student data:", error));
  }, []);

  const handleEditClick = (student) => {
    setEditStudentId(student._id);
    setEditedStudent({ ...student });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = (id) => {
    axios
      .put(`http://localhost:5000/updateStudent/${id}`, editedStudent)
      .then((response) => {
        alert("Student updated successfully");
        setStudents((students) =>
          students.map((student) =>
            student._id === id ? response.data : student
          )
        );
        setEditStudentId(null);
      })
      .catch((error) => console.error("Error updating student:", error));
  };

  const handleCancelClick = () => {
    setEditStudentId(null);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/deleteStudent/${id}`)
      .then(() => {
        alert("Student deleted successfully");
        setStudents((students) =>
          students.filter((student) => student._id !== id)
        );
      })
      .catch((error) => console.error("Error deleting student:", error));
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-r from-amber-100 via-purple-100 to-red-100 p-6">
      <div className="w-full overflow-x-auto bg-white  p-6 rounded-xl shadow-lg border border-gray-200 max-w-7xl">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Student Details
        </h2>
        <table className="min-w-full table-auto text-sm border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">First Name</th>
              <th className="border px-4 py-2">Middle Name</th>
              <th className="border px-4 py-2">Last Name</th>
              <th className="border px-4 py-2">Date of Birth</th>
              <th className="border px-4 py-2">USN</th>
              <th className="border px-4 py-2">Branch</th>
              <th className="border px-4 py-2">Semester</th>
              <th className="border px-4 py-2">Division</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="text-center">
                {editStudentId === student._id ? (
                  <>
                    <td className="border px-2 py-1">
                      <input
                        type="text"
                        name="fname"
                        value={editedStudent.fname}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="border px-2 py-1">
                      <input
                        type="text"
                        name="mname"
                        value={editedStudent.mname}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="border px-2 py-1">
                      <input
                        type="text"
                        name="lname"
                        value={editedStudent.lname}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="border px-2 py-1">
                      <input
                        type="date"
                        name="dob"
                        value={editedStudent.dob}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="border px-2 py-1">
                      <input
                        type="text"
                        name="usn"
                        value={editedStudent.usn}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="border px-2 py-1">
                      <input
                        type="text"
                        name="branch"
                        value={editedStudent.branch}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="border px-2 py-1">
                      <input
                        type="number"
                        name="sem"
                        value={editedStudent.sem}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="border px-2 py-1">
                      <input
                        type="text"
                        name="div"
                        value={editedStudent.div}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="border px-2 py-1">
                      <input
                        type="email"
                        name="email"
                        value={editedStudent.email}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="border px-2 py-1 space-y-1 md:space-y-0 md:space-x-2">
                      <button
                        onClick={() => handleSaveClick(student._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
                        Save
                      </button>
                      <button
                        onClick={handleCancelClick}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded">
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border px-4 py-2">{student.fname}</td>
                    <td className="border px-4 py-2">{student.mname}</td>
                    <td className="border px-4 py-2">{student.lname}</td>
                    <td className="border px-4 py-2">{student.dob}</td>
                    <td className="border px-4 py-2">{student.usn}</td>
                    <td className="border px-4 py-2">{student.branch}</td>
                    <td className="border px-4 py-2">{student.sem}</td>
                    <td className="border px-4 py-2">{student.div}</td>
                    <td className="border px-4 py-2">{student.email}</td>
                    <td className="border px-2 py-1 space-y-1 md:space-y-0 md:space-x-2">
                      <button
                        onClick={() => handleEditClick(student)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center mt-6">
          <a href="/adminHome">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded shadow-md">
              Home
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ViewStudent;
