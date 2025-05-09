import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <nav className="bg-black-900 shadow-md py-4 px-6">
      <ul className="flex flex-col md:flex-row justify-left items-center gap-6">
        <li>
          <Link
            to="/adminLogin"
            className="text-lg font-semibold text-blue-600 hover:text-blue-900 transition-colors duration-200">
            Admin Login
          </Link>
        </li>
        <Link
          to="/staffLogin"
          className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200">
          Staff Login
        </Link>
        <li>
          <Link
            to="/studentLogin"
            className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200">
            Student Login
          </Link>
        </li>
        <li></li>
      </ul>
    </nav>
  );
}

export default Home;
