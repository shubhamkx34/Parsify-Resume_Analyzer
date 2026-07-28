import React from "react";
import CursorGrid from "../../ui/components/CursorGrid";
import { Link } from "react-router";
import { useauth } from "../hooks/useauth";
import { useState } from "react";
import { Atom } from "react-loading-indicators";
import { useNavigate } from "react-router";

const Register = () => {
  const { loading, handleRegister } = useauth();
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    // Save the result returned by useauth.js
    const result = await handleRegister({ username, email, password });
    if (result.success) {
      Navigate("/login"); //Go to login page after registration
    } else {
      setError(result.message); // If it failed, save the backend error text
    }
  };
  if (loading) {
    return (
      <div className="h-screen w-screen bg-gray-950 flex justify-center items-center">
        <Atom color="#1b86bf" size="medium" text="" textColor="#ffffff" />
      </div>
    );
  }

  return (
    <div className="main h-screen relative overflow-hidden w-screen bg-gray-950 flex justify-center ">
      <div className="absolute inset-0 z-0">
        <CursorGrid color="#D946EF" radius={140} />
      </div>

      <h1 className="text-white font-[font2] text-7xl absolute top-32 z-10 ">Sign up</h1>

      <form onSubmit={handleSubmit} className="text-white  font-[font1] flex flex-col top-68 gap-5 relative z-10">
        <div className="username flex flex-col">
          <label htmlFor="username">Username : </label>
          <input
            onChange={e => {
              setUsername(e.target.value);
            }}
            type="username"
            className="bg-white text-black text-center rounded-br-lg rounded-bl-lg  h-10 w-80"
            placeholder="Enter Username"
          />
        </div>

        <div className="email  flex flex-col">
          <label htmlFor="email">Email : </label>
          <input
            onChange={e => {
              setEmail(e.target.value);
            }}
            type="email"
            className="bg-white text-black text-center rounded-br-lg rounded-bl-lg  h-10 w-80"
            placeholder="Enter Email Address"
          />
        </div>

        <div className="pass flex flex-col  ">
          <label htmlFor="password">Password : </label>
          <input
            onChange={e => {
              setPassword(e.target.value);
            }}
            type="password"
            className="bg-white text-black text-center rounded-br-lg rounded-bl-lg  h-10 w-80"
            placeholder="Enter Password"
          />
        </div>

        {error && <p className="text-red-500 text-center font-bold">{error}</p>}
        <button className=" border-slate-500 bg-red-800 border-2 h-10 rounded-3xl active:scale-95 cursor-pointer w-80 ">Register</button>

        <p className="text-slate-200 text-center">
          Already have an account?
          <Link className="text-blue-700" to={"/login"}>
            Login
          </Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Register;
