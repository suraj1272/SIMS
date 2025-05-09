import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const staffLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const notify = () => toast.success("you have been Logged in");
  const errorNotify = (message) => toast.error(message || "Login Failed");
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/staffLogin", {
        email,
        password,
      })
      .then((result) => {
        console.log(result.data);
        notify();
        localStorage.setItem("email", email);
        localStorage.setItem("token", result.data.token);
        setEmail("");
        setPassword("");
        setTimeout(() => {
          navigate("/staffHome");
        }, 2000);
      })
      .catch((error) => {
        errorNotify("invalid Credentials");
        console.log("there was an error ", error);
        // alert("Invalid Email or Password");
      });
  };
  const mainPage = () => {
    navigate("/");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-grey-200">
        <h2 className="text-3xl font-bold text-center text-grey-800 mb-6">
          Staff Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-1 font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              placeholder="enter your email"
              value={email}
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-1 font-medium text-gray-700">
              {" "}
              Password:
            </label>
            <input
              type="password"
              placeholder="enter your password"
              value={password}
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex gap-4 justify-between mt-6">
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-lg transition duration-200">
              Login
            </button>
            <button
              onClick={mainPage}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 rounded-lg transition duration-200">
              Home
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};
export default staffLogin;
