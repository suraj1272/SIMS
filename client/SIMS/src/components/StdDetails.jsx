import axios from "axios";
import { useState } from "react";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-0">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl p-8 md:p-10">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          Register Student
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* First Name */}
          <div>
            <label
              htmlFor="fname"
              className="block text-lg font-semibold text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              name="fname"
              value={fname}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setFname(e.target.value)}
            />
          </div>

          {/* Middle Name */}
          <div>
            <label
              htmlFor="mname"
              className="block text-lg font-semibold text-gray-700 mb-2">
              Middle Name
            </label>
            <input
              type="text"
              placeholder="Middle Name"
              name="mname"
              value={mname}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setMname(e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lname"
              className="block text-lg font-semibold text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              name="lname"
              value={lname}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setLname(e.target.value)}
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label
              htmlFor="dob"
              className="block text-lg font-semibold text-gray-700 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={dob}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          {/* USN */}
          <div>
            <label
              htmlFor="usn"
              className="block text-lg font-semibold text-gray-700 mb-2">
              USN
            </label>
            <input
              type="text"
              placeholder="Enter USN"
              name="usn"
              value={usn}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setUsn(e.target.value)}
            />
          </div>

          {/* Semester */}
          <div>
            <label
              htmlFor="sem"
              className="block text-lg font-semibold text-gray-700 mb-2">
              Semester
            </label>
            <select
              name="sem"
              value={sem}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
            <label
              htmlFor="div"
              className="block text-lg font-semibold text-gray-700 mb-2">
              Division
            </label>
            <select
              name="div"
              value={div}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
            <label
              htmlFor="branch"
              className="block text-lg font-semibold text-gray-700 mb-2">
              Branch
            </label>
            <select
              name="branch"
              value={branch}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
            <label
              htmlFor="email"
              className="block text-lg font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit and Register Staff Buttons */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col md:flex-row gap-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300">
              Submit
            </button>
            <button
              type="button"
              onClick={staffDetails}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300">
              Register Staff
            </button>
          </div>
        </form>
        <a href="/adminHome">
          <button className="w-full mt-6 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300">
            Back to Home
          </button>
        </a>
      </div>
    </div>
  );
};

export default StdDetails;
