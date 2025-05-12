import axios from "axios";
import { useEffect, useState } from "react";

const ViewStaff = () => {
  const [staff, setStaff] = useState([]);
  const [editStaffId, setEditStaffId] = useState(null);
  const [editedStaff, setEditedStaff] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/viewStaff")
      .then((response) => {
        setStaff(response.data);
      })
      .catch((error) => {
        console.error("Error fetching staff data:", error);
      });
  }, []);

  const handleEditClick = (staff) => {
    setEditStaffId(staff._id);
    setEditedStaff({ ...staff });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStaff((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = (id) => {
    axios
      .put(`http://localhost:5000/updateStaff/${id}`, editedStaff)
      .then((response) => {
        alert("Staff updated successfully");
        setStaff(
          staff.map((staff) => (staff._id === id ? response.data : staff))
        );
        setEditStaffId(null);
      })
      .catch((error) => {
        console.error("Error updating staff:", error);
      });
  };

  const handleCancelClick = () => {
    setEditStaffId(null);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/deleteStaff/${id}`)
      .then(() => {
        alert("Staff deleted successfully");
        setStaff(staff.filter((staff) => staff._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting staff:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
      <div className="w-full overflow-x-auto bg-white p-6 rounded-3xl shadow-2xl border border-gray-200 max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Staff Details
        </h2>
        <table className="min-w-full table-auto text-sm border-collapse">
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Name</th>
              <th className="px-4 py-3 text-left font-semibold">Designation</th>
              <th className="px-4 py-3 text-left font-semibold">Experience</th>
              <th className="px-4 py-3 text-left font-semibold">
                Qualification
              </th>
              <th className="px-4 py-3 text-left font-semibold">Email</th>
              <th className="px-4 py-3 text-left font-semibold">Phone</th>
              <th className="px-4 py-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((staff, index) => (
              <tr
                key={staff._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition duration-200`}>
                {editStaffId === staff._id ? (
                  <>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        name="name"
                        value={editedStaff.name}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        name="desgn"
                        value={editedStaff.desgn}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        name="experince"
                        value={editedStaff.experince}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        name="quali"
                        value={editedStaff.quali}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="email"
                        name="email"
                        value={editedStaff.email}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        name="phone"
                        value={editedStaff.phone}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="px-4 py-2 text-center space-x-2">
                      <button
                        onClick={() => handleSaveClick(staff._id)}
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
                    <td className="px-4 py-2">{staff.name}</td>
                    <td className="px-4 py-2">{staff.desgn}</td>
                    <td className="px-4 py-2">{staff.experince}</td>
                    <td className="px-4 py-2">{staff.quali}</td>
                    <td className="px-4 py-2">{staff.email}</td>
                    <td className="px-4 py-2">{staff.phone}</td>
                    <td className="px-4 py-2 text-center space-x-2">
                      <button
                        onClick={() => handleEditClick(staff)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(staff._id)}
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

export default ViewStaff;
