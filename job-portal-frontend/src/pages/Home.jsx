import { Link } from "react-router-dom";

const featuredJobs = [
  {
    title: "Java Developer",
    company: "Tech Solutions",
    location: "Noida",
    type: "Full Time",
    salary: "₹3–5 LPA",
  },
  {
    title: "Spring Boot Developer",
    company: "Innovate Labs",
    location: "Delhi",
    type: "Full Time",
    salary: "₹4–6 LPA",
  },
  {
    title: "React Developer Intern",
    company: "Digital Works",
    location: "Remote",
    type: "Internship",
    salary: "₹10k–15k/month",
  },
];

const Home = () => {
  return (
    <>
      <section className="min-h-[85vh] bg-slate-50 flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
            Find Your <span className="text-blue-600">Dream Job</span>
            <br />
            Build Your Future
          </h1>

          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            Discover opportunities that match your skills and take the next step
            in your career.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Job title or keyword..."
              className="flex-1 px-5 py-4 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
            />

            <input
              type="text"
              placeholder="Location..."
              className="flex-1 px-5 py-4 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
            />
          </div>

          <Link
            to="/jobs"
            className="inline-block mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Browse Jobs
          </Link>

          <p className="mt-5 text-sm text-slate-500">
            Explore opportunities. Take the next step.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8 sm:flex-2">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Featured Jobs</h2>
            <p className="mt-2 text-slate-600">
              Explore opportunities to start your career.
            </p>
          </div>

          <div>
            <Link
              to="/jobs"
              className="text-blue-600 font-semibold hover:underline"
            >
              View All Jobs →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job) => (
            <div
              key={job.title}
              className="border border-slate-200 rounded-xl p-6 bg-white hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-slate-900">
                {job.title}
              </h3>

              <p className="mt-2 text-slate-600">{job.company}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {job.type}
                </span>
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                  {job.location}
                </span>
              </div>

              <p className="mt-5 font-semibold text-slate-800">{job.salary}</p>

              <Link
                to="/jobs"
                className="block text-center mt-5 border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
              >
                View Jobs
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Categories */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center">
            Popular Categories
          </h2>
          <p className="text-slate-600 text-center mt-3">
            Explore jobs across popular career fields.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {[
              "Java Developer",
              "Web Developer",
              "Software Engineer",
              "Data Analyst",
            ].map((category) => (
              <Link
                key={category}
                to="/jobs"
                className="border border-slate-200 rounded-xl p-6 text-center font-semibold text-slate-800 hover:border-blue-500 hover:text-blue-600 hover:shadow-md transition"
              >
                {category}
                <p className="text-sm font-normal text-slate-500 mt-2">
                  Explore opportunities →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-50 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {[
              {
                number: "01",
                title: "Create an Account",
                description: "Register and set up your job seeker profile.",
              },
              {
                number: "02",
                title: "Find Your Job",
                description:
                  "Explore jobs that match your skills and interests.",
              },
              {
                number: "03",
                title: "Apply for Jobs",
                description:
                  "Apply for suitable opportunities and track applications.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="bg-white border border-slate-200 rounded-xl p-6"
              >
                <span className="text-2xl font-bold text-blue-600">
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold text-slate-900 mt-4">
                  {step.title}
                </h3>
                <p className="text-slate-600 mt-2 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link to="/" className="text-xl font-bold text-white">
            JobPortal
          </Link>

          <p className="text-sm text-center">
            Find opportunities. Build your future.
          </p>

          <p className="text-sm">© {new Date().getFullYear()} JobPortal</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
