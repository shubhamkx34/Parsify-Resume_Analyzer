import axios from "axios";

export async function uploadData({ resume, selfDescription, jobDescription }) {
  //to send file from frontend to backend, formdata is used
  const formData = new FormData(); //empty digital envelope.
  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription);
  formData.append("resume", resume);

  const response = await axios.post("http://localhost:3000/api/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function fetchData(reportId) {
  const response = await axios.get(`http://localhost:3000/api/fetch/${reportId}`);
  return response.data;
}

export async function fetchAllData({}) {
  const response = await axios.get("http://localhost:3000/api/fetch");
  return response.data;
}
