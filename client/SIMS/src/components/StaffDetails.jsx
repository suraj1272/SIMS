import axios from "axios";
import React, { useState } from "react";

const StaffDetails = () => {
  const [name, setName] = useState("");
  const [desgn, setDesgn] = useState("");
  const [experience, setExperience] = useState("");
  const [quali, setQuali] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/staffDetails", {
        name,
        desgn,
        experience,
        quali,
        email,
        phone,
        password,
      })
      .then((result) => {
        console.log(result);
        alert("Staff registered successfully");
        setName("");
        setDesgn("");
        setExperience("");
        setQuali("");
        setEmail("");
        setPhone("");
        setPassword("");
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("Please fill in all the details.");
      });
  };

  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-r from-amber-100 via-purple-100 to-red-100">
      <div className="w-full max-w-6xl bg-white p-10 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Register Staff
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Designation */}
          <div>
            <label htmlFor="desgn" className="block font-medium text-gray-700">
              Designation
            </label>
            <input
              type="text"
              placeholder="Enter designation"
              value={desgn}
              name="desgn"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              onChange={(e) => setDesgn(e.target.value)}
            />
          </div>

          {/* Experience */}
          <div>
            <label
              htmlFor="experience"
              className="block font-medium text-gray-700">
              Experience
            </label>
            <input
              type="text"
              placeholder="Enter experience"
              value={experience}
              name="experience"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>

          {/* Qualification */}
          <div>
            <label htmlFor="quali" className="block font-medium text-gray-700">
              Qualification
            </label>
            <input
              type="text"
              placeholder="Enter qualification"
              value={quali}
              name="quali"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              onChange={(e) => setQuali(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              placeholder="Enter phone number"
              value={phone}
              name="phone"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 flex justify-between gap-4">
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-lg transition duration-200">
              Submit
            </button>
          </div>
        </form>
        <a href="/adminHome">
          <button className="w-full mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-lg transition duration-200">
            Home
          </button>
        </a>
      </div>
    </div>
  );
};

export default StaffDetails;
