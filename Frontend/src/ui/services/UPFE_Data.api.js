import axios from "axios";

export async function uploadData({ resume, selfDescription, jobDescription }) {
  //to send file from frontend to backend, formdata is used
  const formData = new FormData(); //empty digital envelope.
  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription);
  formData.append("resume", resume);

  const token = localStorage.getItem("token");

  const response = await axios.post("http://localhost:3000/api/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function fetchData(reportId) {
  const token = localStorage.getItem("token"); // Grab token
  const response = await axios.get(`http://localhost:3000/api/fetch/${reportId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function fetchAllData() {
  const token = localStorage.getItem("token"); // Grab token
  const response = await axios.get("http://localhost:3000/api/fetch", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function downloadResumePdf(reportId) {
  const token = localStorage.getItem("token"); // Grab token
  const response = await axios.post(`http://localhost:3000/api/resume/pdf/${reportId}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob", // Important for handling binary data
  });
  return response.data;
}
