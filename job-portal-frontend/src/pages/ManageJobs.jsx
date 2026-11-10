import { useEffect, useState } from "react";
import { getMyJobs } from "../services/jobService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteJob } from "../services/jobService";

function ManageJobs() {
  const [selectedJobId, setSelectedJobId] = useState(null);
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const data = await getMyJobs();
        setJobs(data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load your jobs",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyJobs();
  }, []);

  const handleDelete = async (jobId) => {
    try{
      await deleteJob(jobId);
      setJobs((prevJob) => prevJob.filter((job) => job.id !== jobId));
      toast.success("Job deleted successfully!")

    } catch(error) {
      toast.error(
        error.response?.data?.message || "Failed to delete job"
      )
    }
  }


  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Manage Jobs</h1>
        <p className="mb-8 text-gray-600">View the jobs you have posted.</p>

        {loading ? (
          <p className="py-10 text-center text-gray-500">
            Loading your jobs...
          </p>
        ) : jobs.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <p className="text-gray-600">You haven't posted any jobs yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <h2 className="mb-3 text-xl font-semibold text-gray-900">
                  {job.title}
                </h2>

                <div className="space-y-2 text-sm text-gray-600">
                  <p>📍 {job.location}</p>
                  <p>💰 Salary: {job.salary ?? "Not specified"}</p>
                  <p>💼 Type: {job.jobType}</p>
                </div>

                <p className="mt-4 line-clamp-3 text-sm text-gray-600">
                  {job.description}
                </p>

                <div className="flex justify-between gap-2 mt-3">
                  <button
                  onClick={() => navigate(`/edit-job/${job.id}`)}
                className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold cursor-pointer text-white hover:bg-blue-700">
                    Edit
                </button>

                <button
                onClick={() => handleDelete(job.id)}
                className="w-full rounded-lg bg-red-600 px-5 py-3 font-semibold cursor-pointer text-white hover:bg-red-700">
                  Delete
                </button>
                </div>

                <div className="w-full mt-2 flex justify-center">
                  <button onClick={() => navigate(`/jobs/${job.id}/applications`)}
                    className="rounded-lg bg-sky-500 px-4 py-2 text-white hover:bg-sky-600 cursor-pointer">
                      View Applications</button>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}

export default ManageJobs;
