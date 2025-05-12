import axios from "axios";
import { useState } from "react";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-6">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl p-8 md:p-10">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          Register Staff
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-semibold text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              name="name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Designation */}
          <div>
            <label
              htmlFor="desgn"
              className="block text-lg font-semibold text-gray-700 mb-2">
              Designation
            </label>
            <input
              type="text"
              placeholder="Enter designation"
              value={desgn}
              name="desgn"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              onChange={(e) => setDesgn(e.target.value)}
            />
          </div>

          {/* Experience */}
          <div>
            <label
              htmlFor="experience"
              className="block text-lg font-semibold text-gray-700 mb-2">
              Experience
            </label>
            <input
              type="text"
              placeholder="Enter experience"
              value={experience}
              name="experience"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>

          {/* Qualification */}
          <div>
            <label
              htmlFor="quali"
              className="block text-lg font-semibold text-gray-700 mb-2">
              Qualification
            </label>
            <input
              type="text"
              placeholder="Enter qualification"
              value={quali}
              name="quali"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              onChange={(e) => setQuali(e.target.value)}
            />
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
              placeholder="Enter email"
              value={email}
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-lg font-semibold text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="text"
              placeholder="Enter phone number"
              value={phone}
              name="phone"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              onChange={(e) => setPhone(e.target.value)}
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
              placeholder="Enter password"
              value={password}
              name="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300">
              Submit
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

export default StaffDetails;
