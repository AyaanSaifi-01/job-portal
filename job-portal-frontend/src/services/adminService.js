import axios from "axios";

const API_URL = "http://localhost:8080/admin";

export const getAllUsers = async () => {
    const token = sessionStorage.getItem("token");

    const response = await axios.get(`${API_URL}/all/users`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    return response.data
}

export const getAllJobs = async () => {
    const token = sessionStorage.getItem("token");

    const response = await axios.get(`${API_URL}/all/jobs`, {
        headers: {
            Authorization: `Bearer ${token}`
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

export const deleteUser = async (userId) => {
    const token = sessionStorage.getItem("token");

    const response = await axios.delete(`${API_URL}/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    return response.data;
}