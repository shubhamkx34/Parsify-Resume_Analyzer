import React, { useState } from "react";
import CursorGrid from "../../ui/components/CursorGrid";
import { Link, useNavigate } from "react-router";
import { useauth } from "../hooks/useauth";
import { Atom } from "react-loading-indicators";

const Login = () => {
  const navigate = useNavigate();

  const { loading, handleLogin } = useauth();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 1. A new lock to keep the loading screen active during the page transition
  const [isNavigating, setIsNavigating] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    
    const result = await handleLogin({ email, password });
    
    if (result.success) {
      // 2. Lock the loading screen ON so the form doesn't flash back
      setIsNavigating(true); 
      // 3. Navigate to Home, and pass a hidden flag saying we just logged in
      navigate("/", { state: { fromLogin: true } }); 
    } else {
      setError(result.message); 
    }
  };

  // 4. Show this loading screen if the API is running OR if we are changing pages
  if (loading || isNavigating) {
    return (
      <div className="h-screen w-screen bg-gray-950 flex justify-center items-center">
        <Atom color="#1b86bf" size="medium" text="Logging in..." textColor="#ffffff" />
      </div>
    );
  }

  return (
    <div className="main h-screen relative overflow-hidden w-screen bg-gray-950 flex justify-center  ">
      <div className="absolute inset-0 z-0">
        <CursorGrid color="#D946EF" radius={140} />
      </div>

      <h1 className="text-white font-[font2] text-7xl absolute top-32 z-10 ">Login</h1>

      <form onSubmit={handleSubmit} className="text-white  font-[font1] flex flex-col gap-5 top-68 relative z-10">
        <div className="email flex flex-col">
          <label htmlFor="email">Email : </label>
          <input
            onChange={e => setEmail(e.target.value)}
            type="email"
            className="bg-white text-black text-center rounded-br-lg rounded-bl-lg  h-10 w-80"
            placeholder="Enter Email Address"
          />
        </div>

        <div className="pass flex flex-col  ">
          <label htmlFor="password">Password : </label>
          <input
            onChange={e => setPassword(e.target.value)}
            type="password"
            className="bg-white text-black text-center rounded-br-lg rounded-bl-lg  h-10 w-80"
            placeholder="Enter Password"
          />
        </div>

        {error && <p className="text-red-500 text-center font-bold">{error}</p>}
        <button className=" border-slate-600 bg-blue-800 border-2 h-10 rounded-3xl active:scale-95 cursor-pointer w-80">Login</button>

        <p className="text-slate-200 text-center">
          Don't have an account?
          <Link className="text-red-700" to={"/register"}>
            Sign up
          </Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Login;