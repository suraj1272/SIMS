import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">College Portal</h1>
          <ul className="flex flex-col md:flex-row justify-center items-center gap-6">
            <li>
              <Link
                to="/adminLogin"
                className="text-lg font-semibold text-blue-600 hover:text-blue-900 transition-colors duration-200">
                Admin Login
              </Link>
            </li>
            <li>
              <Link
                to="/staffLogin"
                className="text-lg font-semibold text-blue-600 hover:text-blue-900 transition-colors duration-200">
                Staff Login
              </Link>
            </li>
            <li>
              <Link
                to="/studentLogin"
                className="text-lg font-semibold text-blue-600 hover:text-blue-900 transition-colors duration-200">
                Student Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex-grow flex items-center justify-center text-center px-6">
        <div className="max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
            Welcome to the College Management System
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Manage student, staff, and administrative tasks seamlessly with our
            modern and user-friendly portal.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/adminLogin"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition duration-300">
              Admin Login
            </Link>
            <Link
              to="/staffLogin"
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition duration-300">
              Staff Login
            </Link>
            <Link
              to="/studentLogin"
              className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition duration-300">
              Student Login
            </Link>
          </div>
        </div>
      </header>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} College Management System. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
