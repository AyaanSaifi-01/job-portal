import { useState } from "react";
import toast from "react-hot-toast";
import { createJob } from "../services/jobService";
import { useNavigate } from "react-router-dom";

function CreateJob() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    jobType: "FULL_TIME",
  });

  const handleChange = (e) => {
    let {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await createJob({...formData, salary: Number(formData.salary)});
        toast.success("Job created successfully!")
        navigate("/manage-jobs")
    } catch(errro) {
        toast.error(errro.response?.data?.message || "Failed to create job");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Post a Job</h1>

        <p className="mb-8 text-gray-600">
          Add the details of the job you want to publish.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block font-medium text-gray-500">Job Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-lg border text-gray-500 border-gray-500 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="e.g. Java Developer"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-500">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              className="w-full rounded-lg border border-gray-400 px-4 py-3 outline-none text-gray-500 focus:border-blue-500"
              placeholder="Describe the job responsibilities and requirements"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-500">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-400 px-4 py-3 outline-none text-gray-500 focus:border-blue-500"
              placeholder="e.g. Noida"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-500">Salary (per year)</label>
            <input
              name="salary"
              type="number"
              min="0"
              value={formData.salary}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-400 px-4 py-3 outline-none text-gray-500 focus:border-blue-500"
              placeholder="e.g. 500000"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-500">Job Type</label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-400 px-4 py-3 outline-none text-gray-500 focus:border-blue-500"
            >
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="INTERNSHIP">Internship</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Create Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateJob;
