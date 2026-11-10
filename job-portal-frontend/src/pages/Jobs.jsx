import { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobService";
import toast from "react-hot-toast";
import { applyForJob } from "../services/applicationService";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [applyingJobId, setApplyingJobId] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAllJobs();
        setJobs(data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-600">Loading jobs...</div>
    );
  }

  const handleApply = async (id) => {
    setApplyingJobId(id);

    try {
      await applyForJob(id);
      toast.success("Job aaplied successfully!");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to apply for job"
      );
    } finally {
      setApplyingJobId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Find Jobs</h1>
        <p className="mb-8 text-gray-600">
          Explore opportunities that match your skills.
        </p>

        <input
          type="text"
          placeholder="Search by job title or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-8 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 text-gray-600"
        />

        {jobs.length === 0 ? (
          <p className="rounded-xl bg-white p-8 text-center text-gray-500">
            No jobs available right now.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs
              .filter((job) =>
                `${job.title} ${job.location}`
                  .toLowerCase()
                  .includes(search.toLowerCase()),
              )
              .map((job) => (
                <div
                  key={job.id}
                  className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md cursor-pointer"
                >
                  <h2 className="mb-2 text-xl font-semibold text-gray-900">
                    {job.title}
                  </h2>

                  <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                    {job.description}
                  </p>

                  <div className="space-y-2 text-sm text-gray-700">
                    <p>📍 {job.location}</p>
                    <p>💰 Salary: {job.salary ?? "Not specified"}</p>
                    <p>💼 Type: {job.jobType}</p>
                  </div>

                  <button
                    onClick={() => handleApply(job.id)}
                    disabled={applyingJobId === job.id}
                    className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700 cursor-pointer"
                  >
                    {applyingJobId === job.id ? "Applying..." : "Apply Now"}
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobs;
