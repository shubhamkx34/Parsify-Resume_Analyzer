import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function uploadData({ resume, selfDescription, jobDescription }) {
  //to send file from frontend to backend, formdata is used
  const formData = new FormData(); //empty digital envelope.
  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription);
  formData.append("resume", resume);

  const token = localStorage.getItem("token");

  const response = await axios.post(`${BASE_URL}/api/upload`, formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function fetchData(reportId) {
  const token = localStorage.getItem("token"); // Grab token
  const response = await axios.get(`${BASE_URL}/api/fetch/${reportId}`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function fetchAllData() {
  const token = localStorage.getItem("token"); // Grab token
  const response = await axios.get(`${BASE_URL}/api/fetch`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function downloadResumePdf(reportId) {
  const token = localStorage.getItem("token"); // Grab token
  const response = await axios.post(`${BASE_URL}/api/resume/pdf/${reportId}`, null, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob", // Important for handling binary data
  });
  return response.data;
}
