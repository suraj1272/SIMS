import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure you import the CSS for react-toastify

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const notify = () => toast.success("Login Sucessfull");
  const notifyError = (message) =>
    toast.error(message || "Login failed. Please try again.");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/adminLogin", { email, password })
      .then((result) => {
        console.log(result);

        localStorage.setItem("token", result.data.token);
        localStorage.setItem("email", email);

        setEmail("");
        notify();
        setPassword("");
        setTimeout(() => {
          navigate("/adminHome");
        }, 1000);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        notifyError("invalid Credentials");
      });
  };

  const mainPage = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
          </div>
          <div className="flex gap-4 justify-between mt-6">
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-lg transition duration-200">
              Login
            </button>
            <button
              type="button"
              onClick={mainPage}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 rounded-lg transition duration-200">
              Home
            </button>
          </div>
        </form>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
};

export default AdminLogin;
