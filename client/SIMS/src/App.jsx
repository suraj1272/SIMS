import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import AddSub from "./components/AddSub";
import AdminHome from "./components/AdminHome";
import AdminLogin from "./components/AdminLogin";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoutes";
import StaffDetails from "./components/StaffDetails";
import StaffHome from "./components/StaffHome";
import StaffLogin from "./components/StaffLogin";
import StdDetails from "./components/StdDetails";
import StudentHome from "./components/StudentHome";
import StudentLogin from "./components/StudentLogin";
import UplodAtt from "./components/UplodAtt";
import UplodMarks from "./components/UplodMarks";
import UpNotice from "./components/UpNotice";
import UpQp from "./components/UpQp";
import ViewAtd from "./components/ViewAtd";
import ViewMarks from "./components/ViewMarks";
import ViewNotice from "./components/ViewNotice";
import ViewQp from "./components/ViewQp";
import ViewStaff from "./components/ViewStaff";
import ViewStudent from "./components/ViewStudent";
import ViewSub from "./components/ViewSub";

const App = () => {
  try {
    return (
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/studentLogin" element={<StudentLogin />} />
          <Route path="/staffLogin" element={<StaffLogin />} />

          {/* Admin Protected Routes */}
          <Route
            path="/adminHome"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminHome/stdDetails"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <StdDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminHome/staffDetails"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <StaffDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminHome/viewStudent"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ViewStudent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminHome/viewStaff"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ViewStaff />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminHome/addSub"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AddSub />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminHome/viewSub"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ViewSub />
              </ProtectedRoute>
            }
          />

          {/* Staff Protected Routes */}
          <Route
            path="/staffHome"
            element={
              <ProtectedRoute allowedRoles={["staff"]}>
                <StaffHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staffHome/uplodAtt"
            element={
              <ProtectedRoute allowedRoles={["staff"]}>
                <UplodAtt />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staffHome/upNotice"
            element={
              <ProtectedRoute allowedRoles={["staff"]}>
                <UpNotice />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staffHome/upQp"
            element={
              <ProtectedRoute allowedRoles={["staff"]}>
                <UpQp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staffHome/uplodMarks"
            element={
              <ProtectedRoute allowedRoles={["staff"]}>
                <UplodMarks />
              </ProtectedRoute>
            }
          />

          {/* Student Protected Routes */}
          <Route
            path="/studentHome"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/studentHome/viewAtd"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <ViewAtd />
              </ProtectedRoute>
            }
          />
          <Route
            path="/studentHome/viewNotice"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <ViewNotice />
              </ProtectedRoute>
            }
          />
          <Route
            path="/studentHome/viewQp"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <ViewQp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/studentHome/viewMarks"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <ViewMarks />
              </ProtectedRoute>
            }
          />
        </Routes>
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
      </Router>
    );
  } catch (error) {
    console.error("Router Error:", error);
    return <div>Error: {error.message}</div>;
  }
};

export default App;
