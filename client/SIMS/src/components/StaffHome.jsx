import axios from "axios";
import { useEffect, useState } from "react";
import { FaFileUpload, FaRegUserCircle } from "react-icons/fa";
import { MdDashboard, MdDriveFolderUpload, MdFileUpload } from "react-icons/md";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
} from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import UplodAtt from "./UplodAtt";
import UplodMarks from "./UplodMarks";
import UpNotice from "./UpNotice";
import UpQp from "./UpQp";

export const StaffHome = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeContent, setActiveContent] = useState("dashboard");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

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

  const [studentCount, setStudentCount] = useState(0);
  const [noticeCount, setNoticeCount] = useState(0);
  const [questionPaperCount, setQuestionPaperCount] = useState(0);

  useEffect(() => {
    // Fetch student count
    axios.get("http://localhost:5000/viewStudent").then((response) => {
      setStudentCount(response.data.length);
    });

    // Fetch notice count
    axios.get("http://localhost:5000/viewNotice").then((response) => {
      setNoticeCount(response.data.length);
    });

    // Fetch question paper count
    axios.get("http://localhost:5000/getAllQp").then((response) => {
      setQuestionPaperCount(response.data.length);
    });
  }, []);

  const renderContent = () => {
    switch (activeContent) {
      case "dashboard":
        return (
          <h2 className="text-2xl font-bold">Welcome to the Staff Dashboard</h2>
        );
      case "uplodAttandance":
        return <UplodAtt />;
      case "uplodNotice":
        return <UpNotice />;
      case "uplodQp":
        return <UpQp />;
      case "uplodMarks":
        return <UplodMarks />;
      default:
        return (
          <h2 className="text-2xl font-bold">Welcome to the Staff Dashboard</h2>
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
            Staff Panel
          </h1>
          <button
            onClick={toggleSidebar}
            className="text-white bg-gray-700 px-2 py-1 hover:bg-gray-600">
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

          {/* Upload Attendance */}
          <button
            onClick={() => setActiveContent("uplodAttandance")}
            className="flex items-center px-4 py-2 hover:bg-gray-700 rounded transition-all duration-200">
            {isSidebarOpen ? (
              <>
                <MdFileUpload className="text-lg" />
                <span className="ml-2">Upload Attendance</span>
              </>
            ) : (
              <MdFileUpload className="text-lg mx-auto" />
            )}
          </button>

          {/* Upload Notice */}
          <button
            onClick={() => setActiveContent("uplodNotice")}
            className="flex items-center px-4 py-2 hover:bg-gray-700 rounded transition-all duration-200">
            {isSidebarOpen ? (
              <>
                <MdDriveFolderUpload className="text-lg" />
                <span className="ml-2">Upload Notice</span>
              </>
            ) : (
              <MdDriveFolderUpload className="text-lg mx-auto" />
            )}
          </button>

          {/* Upload Question Paper */}
          <button
            onClick={() => setActiveContent("uplodQp")}
            className="flex items-center px-4 py-2 hover:bg-gray-700 rounded transition-all duration-200">
            {isSidebarOpen ? (
              <>
                <FaFileUpload className="text-lg" />
                <span className="ml-2">Upload Question Paper</span>
              </>
            ) : (
              <FaFileUpload className="text-lg mx-auto" />
            )}
          </button>

          {/* Upload Marks */}
          <button
            onClick={() => setActiveContent("uplodMarks")}
            className="flex items-center px-4 py-2 hover:bg-gray-700 rounded transition-all duration-200">
            {isSidebarOpen ? (
              <>
                <FaFileUpload className="text-lg" />
                <span className="ml-2">Upload Marks</span>
              </>
            ) : (
              <FaFileUpload className="text-lg mx-auto" />
            )}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Staff Home</h1>
          <button onClick={toggleProfile} className="relative">
            <FaRegUserCircle className="text-2xl cursor-pointer" />
          </button>
          {isProfileOpen && (
            <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 w-48">
              <p className="text-gray-800 font-bold mb-2">{email}</p>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-900 cursor-pointer">
                LogOut
              </button>
            </div>
          )}
        </header>
        <main className="flex-1 p-6 bg-gradient-to-br from-gray-100 to-gray-300 overflow-hidden">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
            Welcome to the Staff Dashboard
          </h2>
          {activeContent === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                <h2 className="text-2xl font-bold mb-2">Students</h2>
                <p className="text-4xl font-extrabold">{studentCount}</p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                <h2 className="text-2xl font-bold mb-2">Uploaded Notices</h2>
                <p className="text-4xl font-extrabold">{noticeCount}</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                <h2 className="text-2xl font-bold mb-2">
                  Uploaded Question Papers
                </h2>
                <p className="text-4xl font-extrabold">{questionPaperCount}</p>
              </div>
            </div>
          )}
          {renderContent()}
        </main>
      </div>

      {/* Toast Notifications */}
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

export default StaffHome;
