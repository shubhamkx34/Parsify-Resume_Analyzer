import React from "react";
import SpecularButton from "./components/spectecularButton.jsx";
import Navbar from "./components/navbar.jsx";
import Beams from "./components/beam.jsx";
import { RiSuitcaseLine } from "@remixicon/react";
import { RiProfileLine } from "@remixicon/react";

const home = () => {
  return (
    <div className="h-screen relative z-0 overflow-hidden  w-screen text-white bg-gray-950">
      <div style={{ width: "100%", height: "100%", position: "absolute" }}>
        <Beams beamWidth={3.2} beamHeight={30} beamNumber={20} lightColor="#ffffff" speed={2} noiseIntensity={1.75} scale={0.2} rotation={30} />
      </div>

      <div className="main relative z-50">
        <Navbar />

        <form>
          <div className="flex justify-between pt-16  px-32 ">
            <div className="jobD flex flex-col ">
              <label className="flex justify-center gap-3 font-bold text-2xl font-[font2]  tracking-wide">
                <RiSuitcaseLine />
                <span>Target Job Description :</span>
              </label>
              <textarea
                className="h-[35vh] w-[70vh] p-6 text-center font-[font1] mt-3 overflow-y-auto text-slate-100 font-semibold rounded-2xl placeholder-gray-300 focus:outline-none border border-slate-800 resize-none  focus:ring-2 focus:border-slate-400 focus:ring-slate-400/20 transition-all [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar-track]:bg-transparent focus:backdrop-blur-md"
                type="text"
                placeholder="Paste the job requirements, responsibilities, and tech stack here..."
              />
            </div>

            <div className="selfD flex flex-col">
              <label className="text-bold text-2xl  font-[font2] text-center tracking-wide">
             Quick Self-Description
                 <span className="border text-sm mr-2 ml-2 rounded py-2 font-[font2] px-3 backdrop-blur-2xl">
                  Optional
                  </span>
                :
              </label>
              <textarea
                className="p-6 placeholder-gray-300 h-[35vh] w-[70vh] text-center mt-3 font-[font1] overflow-y-auto   text-slate-100 font-semibold  rounded-2xl focus:outline-none border border-slate-800  resize-none focus:border-slate-400 focus:ring-slate-400/20 focus:ring-2  transition-all [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar-track]:bg-transparent focus:backdrop-blur-md "
                type="text"
                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
              />
            </div>
          </div>

          <div className="flex flex-col w-70 mt-8 ml-[41vw] ">
            <label className=" flex items-center gap-3  text-bold text-center text-2xl font-[font2]">
              <RiProfileLine className="text-white ml-6" />
              <span>Upload Resume :</span> 
              </label>
            <div className="border-1 backdrop-blur-3xl rounded-3xl mt-2">
              <label for="dropzone-file" className="flex flex-col items-center justify-center w-60 h-35  cursor-pointer ">
                <div className="flex flex-col items-center justify-center  pl-8">
                  <svg
                    className="w-8 h-8 mb-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm ">
                    <span className="font-semibold ">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs">Pdf (MAX 3MB)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
          </div>

          <SpecularButton
            className="ml-[43vw] mt-8"
            size="lg"
            radius={19}
            tint="#ffffff"
            tintOpacity={0}
            blur={0}
            textColor="#f5f5f5"
            lineColor="#ffffff"
            baseColor="#525252"
            intensity={1}
            shineSize={15}
            shineFade={40}
            thickness={1}
            speed={0.35}
            followMouse
            proximity={250}
            autoAnimate={false}
            onClick={() => console.log("clicked")}
          >
            Generate Report
          </SpecularButton>
        </form>
      </div>
    </div>
  );
};

export default home;
