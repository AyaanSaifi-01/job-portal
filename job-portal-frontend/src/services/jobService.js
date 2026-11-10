import axios from "axios";

const API_URL = "http://localhost:8080/jobs";

export const getAllJobs = async () => {
  const token = sessionStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getMyJobs = async () => {
  const token = sessionStorage.getItem("token");

  const response = await axios.get(`${API_URL}/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createJob = async (jobData) => {
  const token = sessionStorage.getItem("token");

  const response = await axios.post(API_URL, jobData, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });

  return response.data;
}

export const editJob = async (jobId, jobData) => {
  const token = sessionStorage.getItem("token");

  const response = await axios.put(`${API_URL}/${jobId}`, jobData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export const deleteJob = async (jobId) => {
  const token = sessionStorage.getItem("token");

  const response = await axios.delete(`${API_URL}/${jobId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });

  return response.data;

}

export const getJobById = async (jobId) => {
  const token = sessionStorage.getItem("token");

  const response = await axios.get(`${API_URL}/${jobId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
