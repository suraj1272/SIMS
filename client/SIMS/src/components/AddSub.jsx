import axios from "axios";
import { useState } from "react";

const AddSub = () => {
  const [subTitle, setSubTitle] = useState("");
  const [subCode, setSubCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/addSub", {
        subTitle,
        subCode,
      })
      .then((result) => {
        alert("Subject Added Successfully");
        setSubTitle("");
        setSubCode("");
      })
      .catch((err) => {
        console.error("There was an error:", err);
        alert("Please fill in all the details.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add Subject
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Subject Title */}
          <div>
            <label
              htmlFor="subTitle"
              className="block text-lg font-medium text-gray-700 mb-2">
              Subject Title
            </label>
            <input
              type="text"
              placeholder="Enter Subject Title"
              value={subTitle}
              name="subTitle"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
              onChange={(e) => setSubTitle(e.target.value)}
            />
          </div>

          {/* Subject Code */}
          <div>
            <label
              htmlFor="subCode"
              className="block text-lg font-medium text-gray-700 mb-2">
              Subject Code
            </label>
            <input
              type="text"
              placeholder="Enter Subject Code"
              value={subCode}
              name="subCode"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
              onChange={(e) => setSubCode(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 rounded-lg shadow-lg transition duration-300">
              Submit
            </button>
          </div>
        </form>

        {/* Back Button */}
        <div className="mt-6">
          <a href="/adminHome">
            <button className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 rounded-lg shadow-lg transition duration-300">
              Back
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AddSub;
