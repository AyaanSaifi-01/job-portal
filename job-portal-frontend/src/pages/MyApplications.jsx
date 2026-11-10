import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyApplications } from "../services/applicationService";
import toast from "react-hot-toast";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getMyApplications();
        setApplications(data);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
          "Failed to load applications"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          My Applications
        </h1>
        <p className="mb-8 text-gray-600">
          Track the jobs you have applied for.
        </p>

        {loading ? (
          <p className="py-10 text-center text-gray-500">
            Loading applications...
          </p>
        ) : applications.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <h2 className="mb-2 text-xl font-semibold text-gray-400">
              No applications yet
            </h2>
            <p className="mb-5 text-gray-600">
              Start exploring jobs that match your skills.
            </p>
            <Link
              to="/jobs"
              className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              Find Jobs
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {applications.map((application) => (
              <div
                key={application.id}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <h2 className="mb-3 text-xl font-semibold text-gray-900">
                  {application.jobTitle}
                </h2>

                <div className="space-y-3 text-sm text-gray-600">
                  <p>
                    Application ID: {application.id}
                  </p>
                  <p>
                    Job ID: {application.jobId}
                  </p>
                  <p>
                    Applied on:{" "}
                    {application.appliedAt
                      ? new Date(application.appliedAt).toLocaleDateString()
                      : "Not available"}
                  </p>
                </div>

                <div className="mt-5 border-t border-gray-100 pt-4">
                  <span className="text-sm text-gray-500">
                    Application Status
                  </span>
                  <p className="mt-1 font-semibold text-blue-700">
                    {application.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyApplications;
