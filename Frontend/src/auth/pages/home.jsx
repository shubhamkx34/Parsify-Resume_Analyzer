import React from "react";
// import LightRays from "../components/LightRays";

function Home() {
  return (
    <div className="h-screen overflow-hidden w-screen bg-slate-950"> 
      {/* <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div> */}
     <div className="h-1/2 w-1/2 flex flex-col bg-red-300 ml-40 text-white">
        <h1 className="text-6xl font-semibold font-[font2] leading-17">
          Get your resume <br /> <span className="text-blue-600">scored in seconds</span>
        </h1>
        <p className=" text-gray-300 text-[1.4vw]">
          Upload your resume and a job description.
          <br /> Our AI finds skill gaps, ATS issues, and <br />
          keyword mismatches — then tells you <br />
          exactly what to fix.
        </p>
      </div>
    </div>
  );
}

export default Home;

