import { Link } from "react-router-dom";

function AdminDashboard() {

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Manage users and jobs on your platform.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              Manage Users
            </h2>

            <p className="mt-2 text-gray-600">
              View and manage all registered users.
            </p>

            <Link
              to="/admin/users"
              className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
              View Users
            </Link>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              Manage Jobs
            </h2>

            <p className="mt-2 text-gray-600">
              View and manage all posted jobs.
            </p>

            <Link
              to="/admin/jobs"
              className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
              View Jobs
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
