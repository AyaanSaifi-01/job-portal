import { Link, useLocation } from "react-router-dom";
// import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const token = sessionStorage.getItem("token");
  const role = token ? JSON.parse(atob(token.split(".")[1])).roles : null;

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };

  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          JobPortal
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl text-gray-700 md:hidden"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>

        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } absolute left-0 top-full w-full flex-col gap-4 border-b border-gray-200 bg-white px-6 py-4 md:static md:flex md:w-auto md:flex-row md:items-center md:gap-6 md:border-0 md:p-0`}
        >
          {location.pathname !== "/jobs" && role === "JOB_SEEKER" && (
            <Link
              to={token ? "/jobs" : "/login"}
              className="text-gray-700 hover:text-blue-600"
            >
              Find Jobs
            </Link>
          )}

          {role === "JOB_SEEKER" && (
            <>
              <Link
                to="/my-applications"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                My Applications
              </Link>
            </>
          )}

          {role === "RECRUITER" && (
            <>
              <Link
                to="/create-job"
                className="font-medium text-gray-700 hover:text-blue-600"
              >
                Post a Job
              </Link>

              <Link
                to="/manage-jobs"
                className="font-medium text-gray-700 hover:text-blue-600"
              >
                Manage Jobs
              </Link>
            </>
          )}

          {role === "ADMIN" && (
            <Link
              to="/admin"
              onClick={() => setIsMenuOpen(false)}
              className="font-medium text-gray-700 hover:text-blue-600"
            >
              Admin Dashboard
            </Link>
          )}

          {!token ? (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700 cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
