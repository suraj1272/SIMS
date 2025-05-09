import axios from "axios";
import React, { useState } from "react";

const StdDetails = () => {
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [dob, setDob] = useState("");
  const [usn, setUsn] = useState("");
  const [sem, setSem] = useState("");
  const [div, setDiv] = useState("");
  const [branch, setBranch] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/stdDetails", {
        fname,
        mname,
        lname,
        dob,
        usn,
        sem,
        div,
        branch,
        email,
        password,
      })
      .then((result) => {
        console.log(result);
        alert("Student Registered Successfully");
        setFname("");
        setMname("");
        setLname("");
        setDob("");
        setUsn("");
        setSem("");
        setDiv("");
        setBranch("");
        setEmail("");
        setPassword("");
      });
  };

  const staffDetails = () => {
    Navigate("/adminHome/staffDetails");
  };

  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-r from-amber-100 via-purple-100 to-red-100">
      <div className="w-full max-w-6xl bg-white p-10 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Register Student
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* First Name */}
          <div>
            <label htmlFor="fname" className="block font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              name="fname"
              value={fname}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              onChange={(e) => setFname(e.target.value)}
            />
          </div>

          {/* Middle Name */}
          <div>
            <label htmlFor="mname" className="block font-medium text-gray-700">
              Middle Name
            </label>
            <input
              type="text"
              placeholder="Middle Name"
              name="mname"
              value={mname}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              onChange={(e) => setMname(e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lname" className="block font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              name="lname"
              value={lname}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              onChange={(e) => setLname(e.target.value)}
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dob" className="block font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={dob}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          {/* USN */}
          <div>
            <label htmlFor="usn" className="block font-medium text-gray-700">
              USN
            </label>
            <input
              type="text"
              placeholder="Enter USN"
              name="usn"
              value={usn}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              onChange={(e) => setUsn(e.target.value)}
            />
          </div>

          {/* Semester */}
          <div>
            <label htmlFor="sem" className="block font-medium text-gray-700">
              Semester
            </label>
            <select
              name="sem"
              value={sem}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              onChange={(e) => setSem(e.target.value)}>
              <option value="">Select Semester</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
          </div>

          {/* Division */}
          <div>
            <label htmlFor="div" className="block font-medium text-gray-700">
              Division
            </label>
            <select
              name="div"
              value={div}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              onChange={(e) => setDiv(e.target.value)}>
              <option value="">Select Division</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>

          {/* Branch */}
          <div>
            <label htmlFor="branch" className="block font-medium text-gray-700">
              Branch
            </label>
            <select
              name="branch"
              value={branch}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              onChange={(e) => setBranch(e.target.value)}>
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="ISE">ISE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Password"
              name="password"
              value={password}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit and Register Staff Buttons */}
          <div className="col-span-1 md:col-span-2 flex justify-between gap-4">
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-lg transition duration-200">
              Submit
            </button>
            <button
              type="button"
              onClick={staffDetails}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-lg transition duration-200">
              Register Staff
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

export default StdDetails;
