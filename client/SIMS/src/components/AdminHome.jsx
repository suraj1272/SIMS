import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FcReading } from "react-icons/fc";
import { ImUsers } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
} from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddSub from "./AddSub";
import StaffDetails from "./StaffDetails";
import StdDetails from "./StdDetails";
import ViewStaff from "./ViewStaff";
import ViewStudent from "./ViewStudent";
import ViewSub from "./ViewSub";

const AdminHome = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeContent, setActiveContent] = useState("dashboard");
  const [isProfileOpen, setIsProfileOpen] = useState(false); // State to toggle profile container
  const [studentCount, setStudentCount] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [subjectCount, setSubjectCount] = useState(0);

  useEffect(() => {
    // Fetch student count
    axios.get("http://localhost:5000/viewStudent").then((response) => {
      setStudentCount(response.data.length);
    });

    // Fetch staff count
    axios.get("http://localhost:5000/viewStaff").then((response) => {
      setStaffCount(response.data.length);
    });

    // Fetch subject count
    axios.get("http://localhost:5000/viewSub").then((response) => {
      setSubjectCount(response.data.length);
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("You have been logged out!");

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen); // Toggle profile container visibility
  };

  const renderContent = () => {
    switch (activeContent) {
      case "dashboard":
        return (
          <h2 className="text-2xl font-bold">Welcome to the Admin Dashboard</h2>
        );
      case "registerStudent":
        return <StdDetails />;
      case "registerStaff":
        return <StaffDetails />;
      case "viewStudent":
        return <ViewStudent />;
      case "viewStaff":
        return <ViewStaff />;
      case "addSubject":
        return <AddSub />;
      case "viewSubject":
        return <ViewSub />;
      default:
        return (
          <h2 className="text-2xl font-bold">Welcome to the Admin Dashboard</h2>
        );
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white ${
          isSidebarOpen ? "w-64" : "w-16"
        } transition-all duration-300 ease-in-out flex flex-col`}>
        <div className="flex justify-between items-center px-4 py-4">
          <h1
            className={`text-2xl font-bold ${
              isSidebarOpen ? "block" : "hidden"
            }`}>
            Admin Panel
          </h1>
          <button
            onClick={toggleSidebar}
            className="text-white bg-gray-700 px-2 py-1 rounded hover:bg-gray-600">
            {isSidebarOpen ? (
              <TbLayoutSidebarLeftCollapseFilled />
            ) : (
              <TbLayoutSidebarRightCollapseFilled />
            )}
          </button>
        </div>
        <nav className="flex flex-col space-y-2">
          {/* Dashboard */}
          <button
            onClick={() => setActiveContent("dashboard")}
            className="flex items-center px-4 py-2 hover:bg-gray-700 rounded transition-all duration-200">
            {isSidebarOpen ? (
              <>
                <MdDashboard className="text-lg" />
                <span className="ml-2">Dashboard</span>
              </>
            ) : (
              <MdDashboard className="text-lg mx-auto" />
            )}
          </button>

          {/* Register Student */}
          <button
            onClick={() => setActiveContent("registerStudent")}
            className="flex items-center px-4 py-2 hover:bg-gray-700 rounded transition-all duration-200">
            {isSidebarOpen ? (
              <>
                <PiStudentFill className="text-lg" />
                <span className="ml-2">Register Student</span>
              </>
            ) : (
              <PiStudentFill className="text-lg mx-auto" />
            )}
          </button>

          {/* Register Staff */}
          <button
            onClick={() => setActiveContent("registerStaff")}
            className="flex items-center px-4 py-2 hover:bg-gray-700 rounded transition-all duration-200">
            {isSidebarOpen ? (
              <>
                <ImUsers className="text-lg" />
                <span className="ml-2">Register Staff</span>
              </>
            ) : (
              <ImUsers className="text-lg mx-auto" />
            )}
          </button>

          {/* View Student */}
          <button
            onClick={() => setActiveContent("viewStudent")}
            className="flex items-center px-4 py-2 hover:bg-gray-700 rounded transition-all duration-200">
            {isSidebarOpen ? (
              <>
                <PiStudentFill className="text-lg" />
                <span className="ml-2">View Student</span>
              </>
            ) : (
              <PiStudentFill className="text-lg mx-auto" />
            )}
          </button>

          {/* View Staff */}
          <button
            onClick={() => setActiveContent("viewStaff")}
            className="flex items-center px-4 py-2 hover:bg-gray-700 rounded transition-all duration-200">
            {isSidebarOpen ? (
              <>
                <ImUsers className="text-lg" />
                <span className="ml-2">View Staff</span>
              </>
            ) : (
              <ImUsers className="text-lg mx-auto" />
            )}
          </button>

          {/* Add Subject */}
          <button
            onClick={() => setActiveContent("addSubject")}
            className="flex items-center px-4 py-2 hover:bg-gray-700 rounded transition-all duration-200">
            {isSidebarOpen ? (
              <>
                <IoBookSharp className="text-lg" />
                <span className="ml-2">Add Subject</span>
              </>
            ) : (
              <IoBookSharp className="text-lg mx-auto" />
            )}
          </button>

          {/* View Subject */}
          <button
            onClick={() => setActiveContent("viewSubject")}
            className="flex items-center px-4 py-2 hover:bg-gray-700 rounded transition-all duration-200">
            {isSidebarOpen ? (
              <>
                <FcReading className="text-lg" />
                <span className="ml-2">View Subject</span>
              </>
            ) : (
              <FcReading className="text-lg mx-auto" />
            )}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Home</h1>

          <button onClick={toggleProfile} className="relative">
            <FaRegUserCircle className="text-2xl cursor-pointer" />
          </button>

          {isProfileOpen && (
            <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 w-48">
              <p className="text-gray-800 font-bold mb-2">{email} </p>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer">
                Logout
              </button>
            </div>
          )}
        </header>
        <main className="flex-1 p-6 bg-gradient-to-br from-gray-100 to-gray-300 overflow-hidden">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8"></h2>
          {activeContent === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                <h2 className="text-2xl font-bold mb-2">Students</h2>
                <p className="text-4xl font-extrabold">{studentCount}</p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                <h2 className="text-2xl font-bold mb-2">Staff</h2>
                <p className="text-4xl font-extrabold">{staffCount}</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                <h2 className="text-2xl font-bold mb-2">Subjects</h2>
                <p className="text-4xl font-extrabold">{subjectCount}</p>
              </div>
            </div>
          )}
          {renderContent()}
        </main>
      </div>

      {/* ToastContainer */}
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
  );
};

export default AdminHome;
