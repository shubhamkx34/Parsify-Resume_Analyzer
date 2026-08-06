import SpecularButton from "../components/spectecularButton.jsx";
import Navbar from "../components/navbar.jsx";
import Beams from "../components/beam.jsx";
import { RiSuitcaseLine, RiProfileLine } from "@remixicon/react";
import { useReport } from "../hooks/useUPFE_Data.js";
import { useState, useRef, useEffect } from "react";
// 1. Import useLocation to read the hidden flag
import { useNavigate, useLocation } from "react-router";
import { Atom } from "react-loading-indicators";
import { useauth } from "../../auth/hooks/useauth.js";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { generateReport, getAllReport, reports } = useReport();
  const [selfDescription, setselfDescription] = useState("");
  const [jobDescription, setjobDescription] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const resumeInputRef = useRef();
  const { handleLogout } = useauth();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInitialData = async () => {
       setIsFetching(true);
       await getAllReport();
       setIsFetching(false); 
    };
    
    fetchInitialData();
  }, []);

  const handleGenerateReport = async e => {
    e.preventDefault();
    const resume = resumeInputRef.current.files[0];
    if (!resume) {
      alert("Please upload a resume first!");
      return;
    }
    const data = await generateReport({ resume, selfDescription, jobDescription });
    if (data && data._id) {
      navigate(`/report/${data._id}`);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await handleLogout();
    if (result.success) {
      navigate("/login");
    } else {
      setError(result.message); 
    }
  };

  // 2. Check if we just arrived here directly from the login page
  const fromLogin = location.state?.fromLogin;

  // 3. ONLY show the loading screen if we are fetching AND we didn't just log in
  // We also changed the text so it makes sense if a user manually refreshes the Home page
  if (isFetching && !fromLogin) {
      return (
        <div className="h-screen w-screen bg-gray-950 flex flex-col justify-center items-center text-white">
          <Atom color="#1b86bf" size="medium" text="" textColor="#ffffff" />
          <p className="mt-4 text-gray-400">Loading Dashboard...</p>
        </div>
      );
  }

  return (
    <div className="min-h-screen relative z-0 overflow-x-hidden overflow-y-auto w-screen text-white bg-gray-950 pb-20">
      <div style={{ width: "100%", height: "100%", position: "fixed", top: 0, left: 0, zIndex: -1 }}>
        <Beams beamWidth={3.2} beamHeight={30} beamNumber={20} lightColor="#ffffff" speed={2} noiseIntensity={1.75} scale={0.2} rotation={30} />
      </div>

      <div className="main relative z-50">
        <div className="nav mr-35">
          <Navbar />
        </div>
        <div className="logout ml-[91vw] -mt-[7.6vh]">
          <button
            onClick={handleSubmit}
            className="bg-white cursor-pointer py-2 px-5  active:scale-95 text-black font-[font1] rounded-2xl"
          >
            Logout
          </button>
        </div>

        <form className="mb-20">
          <div className="flex justify-between pt-16 px-32 ">
            <div className="jobD flex flex-col ">
              <label className="flex justify-center gap-3 font-bold text-2xl font-[font2] tracking-wide">
                <RiSuitcaseLine />
                <span>Target Job Description :</span>
              </label>
              <textarea
                onChange={e => setjobDescription(e.target.value)}
                className="h-[35vh] w-[70vh] p-6 text-center font-[font1] mt-3 overflow-y-auto text-slate-100 font-semibold rounded-2xl placeholder-gray-300 focus:outline-none border border-slate-800 resize-none focus:ring-2 focus:border-slate-400 focus:ring-slate-400/20 transition-all [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar-track]:bg-transparent focus:backdrop-blur-md focus-within:placeholder-transparent"
                type="text"
                placeholder="Paste the job requirements, responsibilities, and tech stack here..."
              />
            </div>

            <div className="selfD flex flex-col">
              <label className="text-bold text-2xl font-[font2] text-center tracking-wide">
                Quick Self-Description
                <span className="border text-sm mr-2 ml-2 rounded py-2 font-[font2] px-3 backdrop-blur-2xl">Optional</span>:
              </label>
              <textarea
                onChange={e => setselfDescription(e.target.value)}
                className="p-6 placeholder-gray-300 h-[35vh] w-[70vh] text-center mt-3 font-[font1] overflow-y-auto text-slate-100 font-semibold rounded-2xl focus:outline-none border border-slate-800 resize-none focus:border-slate-400 focus:ring-slate-400/20 focus:ring-2 transition-all [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar-track]:bg-transparent focus:backdrop-blur-md focus-within:placeholder-transparent"
                type="text"
                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
              />
            </div>
          </div>

          <div className="flex flex-col w-70 mt-8 ml-[41vw] ">
            <label className=" flex items-center gap-3 text-bold text-center text-2xl font-[font2]">
              <RiProfileLine className="text-white ml-6" />
              <span>Upload Resume :</span>
            </label>
            <div className="border-1 backdrop-blur-md rounded-3xl mt-2">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-60 h-35 cursor-pointer ">
                <div className="flex flex-col items-center justify-center pl-8">
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm ">
                    <span className="font-semibold ">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs">Pdf (MAX 3MB)</p>
                </div>
                <input ref={resumeInputRef} id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
          </div>
          {error && <p className="text-red-500 text-center font-bold">{error}</p>}
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
            onClick={handleGenerateReport}
          >
            Generate Report
          </SpecularButton>
        </form>

        {reports?.length > 0 && (
          <div className="flex flex-col w-screen  items-center justify-center mt-12 mb-16">
            <h2 className="text-2xl font-bold font-[font2] tracking-wide mb-6">My Recent Interview Plans</h2>
            <div className="flex flex-col border-y border-gray-700 py-5 w-[55vw] backdrop-blur-md text-center   gap-4 ">
              {reports.map(report => (
                <div
                  key={report._id}
                  className="cursor-pointer hover:text-gray-300 transition-colors list-disc ml-5"
                  onClick={() => navigate(`/report/${report._id}`)}
                >
                  <h3 className="text-lg font-bold">{report.title || "Untitled Position"}</h3>
                  <h3>  Match Score - {report.matchScore}%</h3>
                  <p className="text-sm text-gray-400 font-[font1]">Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;