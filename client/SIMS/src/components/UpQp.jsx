import axios from "axios";
import { useState } from "react";

function UpQp() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/upQp",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Question paper uploaded successfully");
      console.log(response.data);
      setTitle("");
      setFile(null);
    } catch (error) {
      console.error("Error uploading question paper:", error);
      alert("Failed to upload question paper");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-rose-100 to-pink-200 p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Upload Question Paper
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Upload PDF
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              required
              className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-rose-100 file:text-rose-700 hover:file:bg-rose-200"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-rose-500 text-white px-6 py-2 rounded-lg hover:bg-rose-600 transition">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpQp;
