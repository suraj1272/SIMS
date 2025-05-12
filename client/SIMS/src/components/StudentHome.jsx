import { useState } from "react";
import { CiViewList } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { FcReading } from "react-icons/fc";
import { MdDashboard, MdOutlinePreview } from "react-icons/md";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
} from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ViewAtd from "./ViewAtd";
import ViewMarks from "./ViewMarks";
import ViewNotice from "./ViewNotice";
import ViewQp from "./ViewQp";

const StudentHome = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeContent, setActiveContent] = useState("dashboard");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const usn = localStorage.getItem("usn");

  const notify = () => toast.success("You have been logged out");

  const handleLogout = () => {
    localStorage.removeItem("token");
    notify();
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const renderContent = () => {
    switch (activeContent) {
      case "dashboard":
        return (
          <h2 className="text-2xl font-bold">
            Welcome to the Student Dashboard
          </h2>
        );
      case "viewAttendance":
        return <ViewAtd />;
      case "viewNotice":
        return <ViewNotice />;
      case "viewQuestionPaper":
        return <ViewQp />;
      case "viewMarks":
        return <ViewMarks />;
      default:
        return (
          <h2 className="text-2xl font-bold">
            Welcome to the Student Dashboard
          </h2>
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
            Student Panel
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

          {/* View Attendance */}
          <button
            onClick={() => setActiveContent("viewAttendance")}
            className="flex items-center px-4 py-2 hover:bg-gray-700 rounded transition-all duration-200">
            {isSidebarOpen ? (
              <>
                <CiViewList className="text-lg" />
                <span className="ml-2">View Attendance</span>
              </>
            ) : (
              <CiViewList className="text-lg mx-auto" />
            )}
          </button>

          {/* View Notice */}
          <button
            onClick={() => setActiveContent("viewNotice")}
            className="flex items-center px-4 py-2 hover:bg-gray-700 rounded transition-all duration-200">
            {isSidebarOpen ? (
              <>
                <FcReading className="text-lg" />
                <span className="ml-2">View Notice</span>
              </>
            ) : (
              <FcReading className="text-lg mx-auto" />
            )}
          </button>

          {/* View Question Paper */}
          <button
            onClick={() => setActiveContent("viewQuestionPaper")}
            className="flex items-center px-4 py-2 hover:bg-gray-700 rounded transition-all duration-200">
            {isSidebarOpen ? (
              <>
                <MdOutlinePreview className="text-lg" />
                <span className="ml-2">View Question Paper</span>
              </>
            ) : (
              <MdOutlinePreview className="text-lg mx-auto" />
            )}
          </button>

          {/* View Marks */}
          <button
            onClick={() => setActiveContent("viewMarks")}
            className="flex items-center px-4 py-2 hover:bg-gray-700 rounded transition-all duration-200">
            {isSidebarOpen ? (
              <>
                <CiViewList className="text-lg" />
                <span className="ml-2">View Marks</span>
              </>
            ) : (
              <CiViewList className="text-lg mx-auto" />
            )}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Student Home</h1>
          <button onClick={toggleProfile} className="relative">
            <FaRegUserCircle className="text-2xl cursor-pointer" />
          </button>
          {isProfileOpen && (
            <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 w-48">
              <p className="text-gray-800 font-bold mb-2">{usn}</p>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200">
                Logout
              </button>
            </div>
          )}
        </header>
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
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

export default StudentHome;
