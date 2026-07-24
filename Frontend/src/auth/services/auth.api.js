//This file lies under Api layer which connects the frontend to backend using package called axios.

import axios from "axios";

//This is a frontend JavaScript function that registers a new user by sending their account details to a backend server.
export async function register({ username, email, password }) {
  try {
    const response = await axios.post("http://localhost:3000/api/auth/register", { username, email, password }, { withCredentials: true });
    return response.data; //When Axios gets a reply from the server, it wraps the reply inside a large object called response —such as { message: "User registered successfully" } or the user's profile info.
  } catch(err){
   throw err.response?.data?.message || "Register failed!";
  }
}

//JS function for login
export async function login({ email, password }) {
  try {
    const response = await axios.post("http://localhost:3000/api/auth/login", { email, password }, { withCredentials: true });
    return response.data;  //Send the response received from backend to useauth.js for saving data at the frontend using [auth.context.js]
  } catch(err){
   throw err.response?.data?.message || "Login failed!";
  }
}

//JS function for logout
export async function logout() {
  try {
    const response = await axios.get("http://localhost:3000/api/auth/logout",{ withCredentials: true });
    return response.data; 
  } catch(err){
    console.log(err);
  }
}

//JS function for fetching user details
export async function getUser() {
  try {
    const response = await axios.get("http://localhost:3000/api/auth/get-user",{ withCredentials: true });
    return response.data; 
  } catch(err){
    console.log(err);
  }
}