import React, { useState, useEffect } from "react";
import ShinyText from "../components/shineText";
import { RiArrowLeftCircleFill } from "@remixicon/react";
import { useNavigate, useParams } from "react-router";
import { useReport } from "../hooks/useUPFE_Data.js";
import { Atom } from "react-loading-indicators";
import SpecularButton from "../components/spectecularButton.jsx";
import { useauth } from "../../auth/hooks/useauth.js";

const Report = () => {
  const navigate = useNavigate();
  // 1. Grab the report ID from the URL (e.g., /report/12345)
  const { reportId } = useParams();
  // 2. Bring in your custom hook to fetch the data
  const { getReportById, getResumePdf, loading } = useReport();
  // 3. State to hold our fetched data and loading status
  const [reportData, setReportData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  // Tab and Animation states
  const [activeTab, setActiveTab] = useState("technical");
  const [score, setScore] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const { handleLogout } = useauth();
  const [error, setError] = useState("");
  

  // 4. Fetch the data as soon as the page loads
  useEffect(() => {
    const fetchMyReport = async () => {
      setIsFetching(true);
      // Fetch data from backend using the ID from the URL
      const data = await getReportById({ reportId });
      setReportData(data);
      setIsFetching(false);
    };
    fetchMyReport();
  }, [reportId]); // This runs once when the component mounts

  //Logout button feature
  const handleSubmit = async e => {
    e.preventDefault();
    const result = await handleLogout();
    if (result.success) {
      navigate("/login");
    } else {
      setError(result.message);
    }
  };

  // 5. Score Animation Logic
  useEffect(() => {
    // Only run the animation if we have successfully fetched the data
    if (!reportData) return;

    setIsLoaded(true);

    // Get the real score from the AI data, default to 0 if missing
    const targetScore = reportData?.matchScore || 0;
    const duration = 4500;
    const frameRate = 60;
    const totalFrames = Math.round(duration / (1000 / frameRate));
    let currentFrame = 0;

    const easeOutQuart = t => 1 - --t * t * t * t;

    const updateCounter = () => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      const easedProgress = easeOutQuart(progress);
      const currentScore = Math.round(targetScore * easedProgress);

      setScore(currentScore);

      if (currentFrame < totalFrames) {
        requestAnimationFrame(updateCounter);
      } else {
        setScore(targetScore);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [reportData]); // This effect depends on reportData arriving

  // A simple helper function to color-code skill gaps based on AI severity
  const getSeverityColor = severity => {
    if (severity === "high") return "bg-red-500";
    if (severity === "medium") return "bg-orange-500";
    return "bg-yellow-500";
  };

  // 6. Show a loading spinner while waiting for the backend
  if (isFetching) {
    return (
      <div className="min-h-screen flex flex-col relative bg-[#0a0a0a] text-white font-sans">
        <div className="fixed inset-0 z-[100] flex flex-col justify-center items-center bg-black/80 backdrop-blur-sm text-white transition-opacity duration-300">
          <Atom color="#1b86bf" size="large" text="" textColor="#ffffff" />
          <p className="mt-6 text-xl font-semibold animate-pulse font-[font2] tracking-wide">Loading your AI Report...</p>
        </div>
      </div>
    );
  }

  // 7. Render the real page once data is available
  return (
    <div className="min-h-screen flex flex-col relative bg-[#0a0a0a] text-white font-sans">
      {/* --- AI PROCESSING OVERLAY --- */}
      {loading && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-center items-center bg-black/80 backdrop-blur-sm text-white transition-opacity duration-300">
          <Atom color="#1b86bf" size="large" text="" textColor="#ffffff" />
          <p className="mt-6 text-xl font-semibold animate-pulse font-[font2] tracking-wide">Generating Your Resume...</p>
        </div>
      )}

      {/* Background decoration */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_15%_50%,rgba(255,255,255,0.02)_0%,transparent_50%),radial-gradient(circle_at_85%_30%,rgba(255,255,255,0.03)_0%,transparent_50%)] pointer-events-none"></div>

      {/* Header */}
      <header className="pt-2 h-[10vh] w-screen flex text-white justify-between">
        <ShinyText
          className="text-4xl font-[font2] mt-4 ml-13 cursor-pointer"
          text="Parsify"
          speed={2}
          delay={0}
          color="#b5b5b5"
          shineColor="#ffffff"
          spread={120}
          direction="left"
          yoyo
          pauseOnHover={false}
          disabled={false}
        />
        <button
          onClick={handleSubmit}
          className="cursor-pointer mr-20 mt-4 mb-3 font-semibold px-6 active:scale-95 hover:bg-white/75 bg-white text-black font-[font1] rounded-xl"
        >
          Logout
        </button>
      </header>

      {/* Main Layout Grid */}
      <main className="flex-grow flex flex-col lg:flex-row w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 py-8 gap-8 z-10">
        {/* Left Sidebar - Navigation Menu */}
        <aside className="w-full lg:w-64 flex-shrink-0 ">
          <button onClick={() => navigate(-1)} className="mb-10 text-white hover:text-gray-400 transition-colors">
            <RiArrowLeftCircleFill size={55} />
          </button>

          <div className="flex flex-col gap-2 mt-4 lg:mt-auto lg:mb-auto">
            <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              <button
                onClick={() => setActiveTab("technical")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-all ${
                  activeTab === "technical" ? "bg-white/10 border-l-2 border-white text-white" : "text-gray-400 hover:bg-white/5"
                }`}
              >
                Technical Questions
              </button>

              <button
                onClick={() => setActiveTab("behavioral")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-all ${
                  activeTab === "behavioral" ? "bg-white/10 border-l-2 border-white text-white" : "text-gray-400 hover:bg-white/5"
                }`}
              >
                Behavioral Questions
              </button>

              <button
                onClick={() => setActiveTab("roadmap")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-all ${
                  activeTab === "roadmap" ? "bg-white/10 border-l-2 border-white text-white" : "text-gray-400 hover:bg-white/5"
                }`}
              >
                Learning Roadmap
              </button>
              <div className="mt-80 ">
                <SpecularButton
                  className=""
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
                  onClick={() => {
                    getResumePdf(reportId);
                  }}
                >
                  Generate Ai Resume
                </SpecularButton>
              </div>
            </nav>
          </div>
        </aside>

        {/* Center Section - Dynamic Content */}
        <section className="flex-grow min-w-0 flex flex-col gap-6">
          {/* 1. TECHNICAL QUESTIONS */}
          {activeTab === "technical" && (
            <div className="bg-[#171717] bg-opacity-80 backdrop-blur-md rounded-2xl p-6 lg:p-8 shadow-sm border border-white/5">
              <h2 className="text-2xl font-semibold mb-6 text-white">Technical Questions</h2>
              <div className="space-y-6">
                {/* Dynamically map over AI technical questions */}
                {reportData?.technicalQuestions?.map((item, index) => (
                  <div key={index} className="border border-white/10 bg-white/5 rounded-xl p-5 transition-all hover:border-white/20">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-medium text-white">{item.question}</h3>
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-900/30 text-blue-300 border border-blue-800/50">
                        Technical
                      </span>
                    </div>

                    <div className="mb-4">
                      <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-purple-900/30 text-purple-300 mb-2">
                        Intention
                      </span>
                      <p className="text-sm text-gray-400 italic">{item.intention}</p>
                    </div>

                    <div className="mb-4">
                      <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-green-900/30 text-green-300 mb-2">
                        Answer Approach
                      </span>
                      <p className="text-sm text-gray-300">{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. BEHAVIORAL QUESTIONS */}
          {activeTab === "behavioral" && (
            <div className="bg-[#171717] bg-opacity-80 backdrop-blur-md rounded-2xl p-6 lg:p-8 shadow-sm border border-white/5">
              <h2 className="text-2xl font-semibold mb-6 text-white">Behavioral Questions</h2>
              <div className="space-y-6">
                {/* Dynamically map over AI behavioral questions */}
                {reportData?.behavioralQuestions?.map((item, index) => (
                  <div key={index} className="border border-white/10 bg-white/5 rounded-xl p-5 transition-all hover:border-white/20">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-medium text-white">{item.question}</h3>
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-yellow-900/30 text-yellow-300 border border-yellow-800/50">
                        Behavioral
                      </span>
                    </div>

                    <div className="mb-4">
                      <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-purple-900/30 text-purple-300 mb-2">
                        Intention
                      </span>
                      <p className="text-sm text-gray-400 italic">{item.intention}</p>
                    </div>

                    <div className="mb-4">
                      <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-green-900/30 text-green-300 mb-2">
                        Answer Approach
                      </span>
                      <p className="text-sm text-gray-300">{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. LEARNING ROADMAP */}
          {activeTab === "roadmap" && (
            <div className="bg-[#171717] bg-opacity-80 backdrop-blur-md rounded-2xl p-6 lg:p-8 shadow-sm border border-white/5">
              <h2 className="text-2xl font-semibold mb-6 text-white">Learning Roadmap</h2>
              <div className="space-y-6">
                {/* Dynamically map over AI preparation plan */}
                {reportData?.preparationPlan?.map((plan, index) => (
                  <div key={index} className="border-l-2 border-white/20 pl-4 py-2 relative">
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-white -left-[6px] top-4"></div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-1 text-xs font-bold rounded bg-white/10 text-white">Day {plan.day}</span>
                      <h3 className="text-lg font-medium text-white">{plan.focus}</h3>
                    </div>
                    <ul className="space-y-3 mt-4 pl-2">
                      {plan.tasks?.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="material-symbols-outlined text-[18px] text-gray-500 mt-0.5">task :</span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Right Sidebar - Stats & Gaps */}
        <aside className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-6">
          {/* Overall Match Widget */}
          <div
            className={`bg-[#171717] bg-opacity-80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/10 text-center transition-all duration-[800ms] ease-out transform ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">Overall Match</h3>

            <svg className="block mx-auto max-w-[80%] max-h-[200px] my-4" viewBox="0 0 36 36">
              <path
                className="fill-none stroke-white/10 stroke-[2.5]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="fill-none stroke-white stroke-[2.5] rounded-full transition-all duration-75"
                strokeLinecap="round"
                strokeDasharray={`${score}, 100`}
                style={{ filter: "drop-shadow(0 0 4px rgba(255, 255, 255, 0.5))" }}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text className="fill-white font-bold text-[8px]" textAnchor="middle" x="18" y="20.35">
                {score}%
              </text>
            </svg>

            <p className="text-sm text-gray-300 mt-2">
              Match Data for <span className="font-semibold text-white">{reportData?.title || "Target Role"}</span>.
            </p>
          </div>

          {/* Skill Gaps Widget */}
          <div className="bg-[#171717] bg-opacity-80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-orange-500">warning</span>
              <h3 className="font-semibold text-white">Identified Skill Gaps</h3>
            </div>

            <ul className="space-y-4">
              {/* Dynamically map over AI skill gaps */}
              {reportData?.skillGaps?.map((gap, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${getSeverityColor(gap.severity)}`}></div>
                  <div>
                    <span className="block text-sm font-medium text-white">{gap.skill}</span>
                    <span className="block text-xs text-gray-400 mt-0.5 capitalize">Severity: {gap.severity}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Report;
