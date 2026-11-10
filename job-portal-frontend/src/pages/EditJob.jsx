import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById, editJob } from "../services/jobService";
import toast from "react-hot-toast";

function EditJob() {
    const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    jobType: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobById(id);

        setFormData({
          title: data.title,
          description: data.description,
          location: data.location,
          salary: data.salary,
          jobType: data.jobType,
        });
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load job details",
        );
        navigate("/manage-jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, navigate]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await editJob(id, {...formData, salary: Number(formData.salary)});
        toast.success("Job updated successfully!");
        navigate("/manage-jobs");
    } catch(error) {
        toast.error(
            error.response?.data?.message || "Failed to update job"
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Edit Job</h1>

        <p className="mb-8 text-gray-600">Update your job posting details.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="text-gray-500">
            <label className="mb-2 block font-medium">Job Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-400 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="text-gray-500">
            <label className="mb-2 block font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-nonefocus:border-blue-500"
            />
          </div>

          <div className="text-gray-500">
            <label className="mb-2 block font-medium">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="text-gray-500">
            <label className="mb-2 block font-medium">Salary (per year)</label>
            <input
              name="salary"
              type="number"
              min="0"
              value={formData.salary}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="text-gray-500">
            <label className="mb-2 block font-medium">Job Type</label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="INTERNSHIP">Internship</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white cursor-pointer hover:bg-blue-700"
          >
            Update Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditJob;
