import axios from "axios";

const API_URL = "http://localhost:8080/applications";

export const applyForJob = async (jobId) => {
    const token = sessionStorage.getItem("token");

    const response = await axios.post(
        `${API_URL}/${jobId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
    );

    return response.data;
};

export const getMyApplications = async () => {
    const token = sessionStorage.getItem("token");

    const response = await axios.get(`${API_URL}/my`, 
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
    );

    return response.data;
};

export const getApplicationForJob = async (id) => {
    const token = sessionStorage.getItem("token");

    const response = await axios.get(`${API_URL}/job/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    return response.data;
};

export const updateApplicationStatus = async (applicationId, status) => {
    const token = sessionStorage.getItem("token");

    const response = await axios.put(`${API_URL}/${applicationId}/status`, {status}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}
