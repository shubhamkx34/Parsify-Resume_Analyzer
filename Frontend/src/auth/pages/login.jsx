import React from "react";
import CursorGrid from "../components/CursorGrid";
import { Link } from "react-router";

const login = () =>{

  
  const handlesubmit = (e)=>{
    e.preventDefault()
  }

  return (
    <div className="main h-screen relative overflow-hidden w-screen bg-gray-950 flex justify-center  ">
      <div className="absolute inset-0 z-0">
        <CursorGrid color="#D946EF" radius={140} />
      </div>

      <h1 className="text-white font-[font2] text-7xl absolute top-32 z-10 ">Login</h1>

      <form onSubmit={handlesubmit} className="text-white  font-[font1] flex flex-col gap-5 top-68 relative z-10">
        <div className="email flex flex-col">
          <label htmlFor="email">Email : </label>
          <input type="email" className="bg-white text-black text-center rounded-br-lg rounded-bl-lg  h-10 w-80" placeholder="Enter Email Address" />
        </div>

        <div className="pass flex flex-col  ">
          <label htmlFor="password">Password : </label>
          <input type="password" className="bg-white text-black text-center rounded-br-lg rounded-bl-lg  h-10 w-80" placeholder="Enter Password" />
        </div>

        <div className="">
          <button className=" border-slate-600 border-2 h-10 rounded-3xl active:scale-95 w-80">Login</button>
        </div>
         <p className="text-slate-200 text-center">Don't have an account?<Link className="text-red-700" to={"/register"} >Register</Link> </p>
      </form>
    </div>
  );
}

export default login;
