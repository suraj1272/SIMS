import axios from "axios";
import React, { useEffect, useState } from "react";

const ViewNotice = ({ isStaff }) => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/viewNotice")
      .then((response) => {
        setNotices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notices:", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/deleteNotice/${id}`)
      .then(() => {
        alert("Notice deleted successfully");
        setNotices(notices.filter((notice) => notice._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting notice:", error);
      });
  };

  const handleUpdate = (id) => {
    const newNo = prompt("Enter new notice number:");
    const newTitle = prompt("Enter new notice title:");
    if (newNo && newTitle) {
      axios
        .put(`http://localhost:5000/updateNotice/${id}`, {
          no: newNo,
          title: newTitle,
        })
        .then((response) => {
          alert("Notice updated successfully");
          setNotices(
            notices.map((notice) =>
              notice._id === id ? response.data : notice
            )
          );
        })
        .catch((error) => {
          console.error("Error updating notice:", error);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Notices
        </h2>
        {notices.length > 0 ? (
          <table className="min-w-full border text-sm">
            <thead className="bg-indigo-200 text-indigo-900">
              <tr>
                <th className="py-2 px-4 border">Notice Number</th>
                <th className="py-2 px-4 border">Title</th>
                {isStaff && <th className="py-2 px-4 border">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {notices.map((notice) => (
                <tr key={notice._id} className="hover:bg-indigo-50">
                  <td className="py-2 px-4 border">{notice.no}</td>
                  <td className="py-2 px-4 border">{notice.title}</td>
                  {isStaff && (
                    <td className="py-2 px-4 border space-x-2">
                      <button
                        onClick={() => handleUpdate(notice._id)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(notice._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 mt-4">No notices found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewNotice;
