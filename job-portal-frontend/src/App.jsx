import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Jobs from "./pages/Jobs";
import Navbar from "./components/Navbar";
import ProtectedRoutes from "./components/ProtectedRoutes";
import MyApplications from "./pages/MyApplications";
import ManageJobs from "./pages/ManageJobs";
import CreateJob from "./pages/CreateJobs";
import EditJob from "./pages/EditJob";
import ApplicationsForJob from "./pages/ApplicationsForJob";
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUsers";
import ViewAllJobs from "./pages/ViewAllJobs";


const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/my-applications" element={<MyApplications/>} />
          <Route path="/manage-jobs" element={<ManageJobs />} />
          <Route path="/create-job" element={<CreateJob />} />
          <Route path="/edit-job/:id" element={<EditJob />} />
          <Route path="/jobs/:jobId/applications" element={<ApplicationsForJob />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<ManageUsers/>} />
          <Route path="/admin/jobs" element={<ViewAllJobs/>}/>
        </Route>
      </Routes>
    </>
  );
};

export default App;
