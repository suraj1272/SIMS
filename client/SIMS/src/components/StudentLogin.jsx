import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const studentLogin = () => {
  const [usn, setUsn] = useState("");
  const [password, setPassword] = useState("");
  const notify = () => toast.success("you are logged in ");
  const notifyError = (message) =>
    toast.error(message || "login failed please login Again");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/studentLogin", {
        usn,
        password,
      })
      .then((result) => {
        console.log(result.data);
        localStorage.setItem("usn", usn);
        localStorage.setItem("token", result.data.token);
        notify();
        setUsn("");
        setPassword("");
        setTimeout(() => {
          navigate("/studentHome");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        notifyError("invalid credentails");
        // alert("invalid credentaials");
      });
  };
  const mainPage = () => {
    navigate("/");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Student Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <label htmlFor="usn" className="block mb-1 font-medium text-gray-700">
            <strong>USN</strong>
          </label>
          <input
            type="text"
            placeholder="Enter USN"
            value={usn}
            name="USN"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            onChange={(e) => setUsn(e.target.value)}></input>
          <label
            htmlFor="password"
            className="block mb-1 font-medium text-gray-700">
            <strong>Password</strong>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            name="password"
            className="w-full px-4 py-2 border border-grey-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex gap-4 justify-between mt-6">
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-lg transition duration-200 cursor-pointer">
              Login
            </button>
            <button
              onClick={mainPage}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 rounded-lg transition duration-200 cursor-pointer">
              Home
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};
export default studentLogin;
