import { useEffect, useState } from "react";
import {
  getApplicationForJob,
  updateApplicationStatus,
} from "../services/applicationService";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function ApplicationsForJob() {
  const { jobId } = useParams();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getApplicationForJob(jobId);
        console.log(data);
        setApplications(data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load applications",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId]);

  const handleStatusChange = async (applicationId, status) => {
    try {
      await updateApplicationStatus(applicationId, status);
      setApplications((prevApplications) =>
        prevApplications.map((application) =>
          application.id === applicationId
            ? { ...application, status }
            : application,
        ),
      );

      toast.success("Application status updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Job Applications
        </h1>

        <p className="mb-8 text-gray-600">View applicants for this job.</p>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading applications...</p>
      ) : applications.length === 0 ? (
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">
            No applications yet
          </h2>
          <p className="mt-2 text-gray-600">
            Applications for this job will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <div
              key={application.id}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              <h1 className="text-blue-500 text-2xl mb-3 font-bold">
                Position : {application.jobTitle}
              </h1>
              <h2 className="text-lg font-semibold text-gray-900">
                {application.jobSeekerName}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Applied on:{" "}
                {new Date(application.appliedAt).toLocaleDateString()}
              </p>

              <p className="mt-3 text-sm text-gray-700">
                Status: {application.status}
              </p>

              <select
                value={application.status}
                onChange={(e) =>
                  handleStatusChange(application.id, e.target.value)
                }
                className="rounded-lg border border-gray-300 focus:border-blue-500 text-gray-500 outline-none px-3 py-2 text-sm mt-2"
              >
                <option value="APPLIED">Applied</option>
                <option value="SHORTLISTED">Shortlisted</option>
                <option value="HIRED">Hired</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ApplicationsForJob;
