import React, { useState } from "react";
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
          <button
            onClick={() => setActiveContent("dashboard")}
            className="block text-left px-4 py-2 hover:bg-gray-700 rounded">
            {isSidebarOpen ? "Dashboard" : <MdDashboard />}
          </button>
          <button
            onClick={() => setActiveContent("registerStudent")}
            className="block text-left px-4 py-2 hover:bg-gray-700 rounded">
            {isSidebarOpen ? "Register Student" : <PiStudentFill />}
          </button>
          <button
            onClick={() => setActiveContent("registerStaff")}
            className="block text-left px-4 py-2 hover:bg-gray-700 rounded">
            {isSidebarOpen ? "Register Staff" : <ImUsers />}
          </button>
          <button
            onClick={() => setActiveContent("viewStudent")}
            className="block text-left px-4 py-2 hover:bg-gray-700 rounded">
            {isSidebarOpen ? "View Student" : <PiStudentFill />}
          </button>
          <button
            onClick={() => setActiveContent("viewStaff")}
            className="block text-left px-4 py-2 hover:bg-gray-700 rounded">
            {isSidebarOpen ? "View Staff" : <ImUsers />}
          </button>
          <button
            onClick={() => setActiveContent("addSubject")}
            className="block text-left px-4 py-2 hover:bg-gray-700 rounded">
            {isSidebarOpen ? "Add Subject" : <IoBookSharp />}
          </button>
          <button
            onClick={() => setActiveContent("viewSubject")}
            className="block text-left px-4 py-2 hover:bg-gray-700 rounded">
            {isSidebarOpen ? "View Subject" : <FcReading />}
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
        <main className="flex-1 p-6 bg-gray-100 overflow-hidden">
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
