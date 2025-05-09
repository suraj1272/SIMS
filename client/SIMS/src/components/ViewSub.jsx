import axios from "axios";
import { useEffect, useState } from "react";

const ViewSub = () => {
  const [subjects, setSubjects] = useState([]);
  const [editSubjectId, setEditSubjectId] = useState(null);
  const [editedSubject, setEditedSubject] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/viewSub")
      .then((response) => {
        setSubjects(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch the subjects", error);
      });
  }, []);

  const handleEditClick = (subject) => {
    setEditSubjectId(subject._id);
    setEditedSubject({ ...subject });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedSubject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = (id) => {
    axios
      .put(`http://localhost:5000/updateSub/${id}`, editedSubject)
      .then((response) => {
        alert("Subject updated successfully");
        setSubjects(
          subjects.map((subject) =>
            subject._id === id ? response.data : subject
          )
        );
        setEditSubjectId(null);
      })
      .catch((error) => {
        console.error("Error updating subject:", error);
      });
  };

  const handleCancelClick = () => {
    setEditSubjectId(null);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/deleteSub/${id}`)
      .then(() => {
        alert("Subject deleted successfully");
        setSubjects(subjects.filter((subject) => subject._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting subject:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-r from-amber-100 via-purple-100 to-red-100 p-6">
      <div className="w-full overflow-x-auto bg-white  p-6 rounded-xl shadow-lg border border-gray-200 max-w-7xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Subject Details
        </h2>
        <table className="min-w-full table-auto text-sm border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Subject ID</th>
              <th className="border px-4 py-2">Subject Name</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject._id} className="text-center">
                {editSubjectId === subject._id ? (
                  <>
                    <td className="border px-2 py-1">
                      <input
                        type="text"
                        name="subCode"
                        value={editedSubject.subCode}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="border px-2 py-1">
                      <input
                        type="text"
                        name="subTitle"
                        value={editedSubject.subTitle}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="border px-2 py-1 space-y-2 md:space-y-0 md:space-x-2">
                      <button
                        onClick={() => handleSaveClick(subject._id)}
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
                    <td className="border px-4 py-2">{subject.subCode}</td>
                    <td className="border px-4 py-2">{subject.subTitle}</td>
                    <td className="border px-4 py-2 space-y-2 md:space-y-0 md:space-x-2">
                      <button
                        onClick={() => handleEditClick(subject)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(subject._id)}
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

export default ViewSub;
