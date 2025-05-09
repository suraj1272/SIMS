import axios from "axios";
import { useState } from "react";

const addSub = () => {
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
        console.log(result);
        alert("Subject Added Sucessfully ");
        setSubTitle("");
        setSubCode("");
      })
      .catch((err) => {
        console.error("there was an error ", err);
        alert("fill the details ");
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-amber-100 via-purple-100 to-red-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-grey-200">
        <h2 className="text-3xl font-bold text-center text-grey-800 mb-6">
          Add Subjects
        </h2>
        <form className="form space-y-5" onSubmit={handleSubmit}>
          <label htmlFor="subtitle" className="block font-medium text-grey-700">
            <strong>Subject Title:</strong>
          </label>
          <input
            type="text"
            placeholder="Subject Title"
            value={subTitle}
            name="subTitle"
            className="w-full px-4 py-2 border border-grey-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus-outline-none"
            onChange={(e) => setSubTitle(e.target.value)}
          />
          <div className="subCode">
            <label
              htmlFor="subCode"
              className="block font-medium text-grey-700">
              <strong>Subject Code:</strong>
            </label>
            <input
              type="text"
              placeholder="Subject Code"
              value={subCode}
              name="subCode"
              className="w-full px-4 py-2 border border-grey-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus-outline-none"
              onChange={(e) => setSubCode(e.target.value)}
            />
          </div>
          <div className="flex-grow gap-4 justify-between mt-6">
            <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-xl transition-duration-200 cursor-pointer">
              Submit
            </button>
          </div>
        </form>
        <div className="flex-grow gap-4 justify-between my-6">
          <a href="/adminHome">
            <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-xl transition-duration-200 cursor-pointer">
              BACK
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};
export default addSub;
