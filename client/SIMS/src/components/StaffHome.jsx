import { useState } from "react";
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
  const notify = () => toast.success("you have been logged out");
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
            {" "}
            Welcome to the Staff Dashboard{" "}
          </h2>
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
          <h2 className="text-2xl font-bold">Welcome to the Staff DashBoard</h2>
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
            } `}>
            Staff Panel
          </h1>
          <button
            onClick={toggleSidebar}
            className="text-white bg-grey-700 px-2 py-1 hover:bg-grey-600">
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
            {isSidebarOpen ? "DashBoard" : <MdDashboard />}
          </button>
          <button
            onClick={() => setActiveContent("uplodAttandance")}
            className="block text-left px-4 py-2 hover:bg-gray-700 rounded">
            {isSidebarOpen ? "uplodAttandance" : <MdFileUpload />}
          </button>
          <button
            onClick={() => setActiveContent("uplodNotice")}
            className="block text-left px-4 py-2 hover:bg-gray-700 rounded">
            {isSidebarOpen ? "uplodNotice" : <MdDriveFolderUpload />}
          </button>
          <button
            onClick={() => setActiveContent("uplodQp")}
            className="block text-left px-4 py-2 hover:bg-gray-700 rounded ">
            {isSidebarOpen ? "UplodQp" : <FaFileUpload />}
          </button>
          <button
            onClick={() => setActiveContent("uplodMarks")}
            className="block text-left px-4 py-2 hover:bg-gray-700 rounded">
            {isSidebarOpen ? "UplodMarks" : <FaFileUpload />}
          </button>
        </nav>
      </div>
      <div className="flex-1 flex flex-col relative">
        <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Staff Home</h1>
          <button onClick={toggleProfile} className="relative">
            <FaRegUserCircle className="text-2xl cursor-pointer" />
          </button>
          {isProfileOpen && (
            <div className="absolute top-16 right-4 bg-white hadow-lg rounded-lg p-4 w-48">
              <p className="text-gray-800 font-bold mb-2">{email}</p>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-900 cursor-pointer">
                LogOut
              </button>
            </div>
          )}
        </header>
        <main className="flex-1 p-6 bg-gray-100 overflow-hidden">
          {renderContent()}
        </main>
      </div>
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
