import axios from "axios";
import React, { useState } from "react";
import ViewNotice from "./ViewNotice";

const UpNotice = () => {
  const [no, setNo] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/upNotice", {
        no,
        title,
      })
      .then((res) => {
        console.log(res.data);
        alert("Notice Uploaded Successfully");
        setNo("");
        setTitle("");
      })
      .catch((err) => {
        console.log("Error uploading notice:", err);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-indigo-100 to-purple-100 p-4">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Upload Notice
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <label
              htmlFor="no"
              className="block mb-1 text-sm font-medium text-gray-700">
              Notice Number
            </label>
            <input
              id="no"
              type="number"
              name="no"
              value={no}
              onChange={(e) => setNo(e.target.value)}
              placeholder="Enter notice number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label
              htmlFor="title"
              className="block mb-1 text-sm font-medium text-gray-700">
              Notice Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter notice"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition">
              Submit
            </button>
          </div>
        </form>

        <div className="mt-10">
          <ViewNotice isStaff={true} />
        </div>
      </div>
    </div>
  );
};

export default UpNotice;
