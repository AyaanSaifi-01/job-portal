import React, { useEffect, useState } from 'react'
import { deleteJob, getAllJobs } from '../services/adminService';
import toast from 'react-hot-toast';

const ViewAllJobs = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const data = await getAllJobs();
        setJobs(data);
      } catch (err) {
        toast.error (
          err.response?.data?.message || "Failed to load the jobs!"
        )
      } finally {
        setLoading(false);
      }
    } 

    fetchAllJobs();
  }, []);

  const handleDelete = async (jobId) => {
    try {
      await deleteJob(jobId);
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
      toast.success("Job deleted successfully!")
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete job"
      )
    } 
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Jobs
          </h1>
          <p className="mt-2 text-gray-500">
            View and manage all jobs posted on the platform.
          </p>
        </div>

        {/* Job Count */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total Posted Jobs
          </p>
          <h2 className="mt-1 text-3xl font-bold text-blue-600">
            {jobs.length}
          </h2>
        </div>

        {/* Jobs Table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">

            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                    Job Title
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                    Salary
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                    Location
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                    Job Type
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="py-10 text-center text-gray-500">
                      Loading jobs...
                    </td>
                  </tr>
                ) : jobs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-10 text-center text-gray-500">
                      No jobs found.
                    </td>
                  </tr>
                ) : (
                  jobs.map((job) => (
                    <tr key={job.id} className="transition hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {job.title}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {job.salary}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {job.location}
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                          {job.jobType}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(job.id)}
                          className="rounded-lg bg-red-50 px-4 cursor-pointer py-2 text-sm font-medium text-red-600 transition hover:bg-red-600 hover:text-white"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

          </div>
        </div>

      </div>
    </div>
  );
}

export default ViewAllJobs;
