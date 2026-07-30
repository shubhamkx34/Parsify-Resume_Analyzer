import React, { useState, useEffect } from "react";
import ShinyText from "../components/shineText";
import { RiArrowLeftCircleFill } from "@remixicon/react";
import { useNavigate } from "react-router";

const Report = () => {
  const navigate = useNavigate();
  // We use this state to keep track of which tab is currently selected.
  // By default, we set it to 'technical'.
  const [activeTab, setActiveTab] = useState("technical");

  // Animation States for Overall Match Widget
  const [score, setScore] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation Logic
  useEffect(() => {
    setIsLoaded(true);

    const targetScore = 78;
    // Increased to 4500ms (4.5 seconds) to build suspense and curiosity
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
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative bg-[#0a0a0a] text-white font-sans">
      {/* Background decoration */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_15%_50%,rgba(255,255,255,0.02)_0%,transparent_50%),radial-gradient(circle_at_85%_30%,rgba(255,255,255,0.03)_0%,transparent_50%)] pointer-events-none"></div>

      {/* Header */}
      <header className="pt-2 h-[10vh] w-screen flex  text-white justify-between">
        <ShinyText
          className=" text-4xl font-[font2] mt-4 ml-13 cursor-pointer"
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

        <button className="cursor-pointer mr-20 mt-4 mb-3 font-semibold px-6 active:scale-95 hover:bg-white/75 bg-white text-black font-[font1] rounded-xl">
          Logout
        </button>
      </header>

      {/* Main Layout Grid */}
      <main className="flex-grow flex flex-col lg:flex-row w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 py-8 gap-8 z-10">
        {/* Left Sidebar - Navigation Menu */}
        <aside className="w-full lg:w-64 flex-shrink-0 ">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="mb-10 text-white hover:text-gray-400 transition-colors"
          >
            <RiArrowLeftCircleFill size={55} />
          </button>

          <div className="flex flex-col gap-2 mt-4 lg:mt-auto lg:mb-auto">
            <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {/* Technical Questions Tab */}
              <button
                onClick={() => setActiveTab("technical")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-all whitespace-nowrap lg:whitespace-normal ${
                  activeTab === "technical" ? "bg-white/10 border-l-2 border-white text-white" : "text-gray-400 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-xl">code</span>
                  <span>|</span>
                </div>
                Technical Questions
              </button>

              {/* Behavioral Questions Tab */}
              <button
                onClick={() => setActiveTab("behavioral")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-all whitespace-nowrap lg:whitespace-normal ${
                  activeTab === "behavioral" ? "bg-white/10 border-l-2 border-white text-white" : "text-gray-400 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-xl">psychology</span>
                  <span>|</span>
                </div>
                Behavioral Questions
              </button>

              {/* Learning Roadmap Tab */}
              <button
                onClick={() => setActiveTab("roadmap")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-all whitespace-nowrap lg:whitespace-normal ${
                  activeTab === "roadmap" ? "bg-white/10 border-l-2 border-white text-white" : "text-gray-400 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-xl">map</span>
                  <span>|</span>
                </div>
                Learning Roadmap
              </button>
            </nav>
          </div>
        </aside>

        {/* Center Section - Dynamic Content Based on Active Tab */}
        <section className="flex-grow min-w-0 flex flex-col gap-6">
          {/* 1. TECHNICAL QUESTIONS SECTION */}
          {activeTab === "technical" && (
            <div className="bg-[#171717] bg-opacity-80 backdrop-blur-md rounded-2xl p-6 lg:p-8 shadow-sm border border-white/5">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-white">Technical Questions</h2>

              <div className="space-y-6">
                <div className="border border-white/10 bg-white/5 rounded-xl p-5 transition-all hover:border-white/20">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-medium text-white">Explain the Virtual DOM in React.</h3>
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-900/30 text-blue-300 border border-blue-800/50">
                      Frontend
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    How does it compare to the actual DOM, and why does it make React faster? Provide a simple example of how a state change updates
                    the DOM.
                  </p>

                  <div className="mb-4">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-purple-900/30 text-purple-300 mb-2">
                      Intention
                    </span>
                    <p className="text-sm text-gray-400 italic">
                      To assess the candidate's understanding of React's rendering optimization and reconciliation process.
                    </p>
                  </div>

                  <div className="mb-4">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-green-900/30 text-green-300 mb-2">
                      Model Answer
                    </span>
                    <p className="text-sm text-gray-300">
                      The Virtual DOM is a lightweight JavaScript representation of the actual DOM. When state changes, React creates a new Virtual
                      DOM tree, compares it with the previous one (diffing), and calculates the minimum number of changes needed to update the real
                      DOM (reconciliation). This avoids expensive direct DOM manipulations.
                    </p>
                  </div>

                  <div className="flex items-center gap-4 border-t border-white/10 pt-4 mt-2">
                    <button className="text-xs font-medium text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
                      <span className="material-symbols-outlined text-sm">visibility</span> Show Hint
                    </button>
                    <button className="text-xs font-medium text-white hover:opacity-80 flex items-center gap-1 transition-opacity ml-auto">
                      <span className="material-symbols-outlined text-sm">edit_note</span> Try Answering
                    </button>
                  </div>
                </div>

                <div className="border border-white/10 bg-white/5 rounded-xl p-5 transition-all hover:border-white/20">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-medium text-white">What is a closure in JavaScript?</h3>
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-yellow-900/30 text-yellow-300 border border-yellow-800/50">
                      Core JS
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    Can you provide a practical use case where a closure is beneficial? Explain lexical scoping in this context.
                  </p>

                  <div className="mb-4">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-purple-900/30 text-purple-300 mb-2">
                      Intention
                    </span>
                    <p className="text-sm text-gray-400 italic">
                      To evaluate knowledge of JavaScript's scope chain and memory management through persistent variable access.
                    </p>
                  </div>

                  <div className="mb-4">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-green-900/30 text-green-300 mb-2">
                      Model Answer
                    </span>
                    <p className="text-sm text-gray-300">
                      A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment).
                      It allows an inner function to access the scope of an outer function even after the outer function has finished executing.
                      Practical uses include data privacy (private variables) and function factories.
                    </p>
                  </div>

                  <div className="flex items-center gap-4 border-t border-white/10 pt-4 mt-2">
                    <button className="text-xs font-medium text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
                      <span className="material-symbols-outlined text-sm">visibility</span> Show Hint
                    </button>
                    <button className="text-xs font-medium text-white hover:opacity-80 flex items-center gap-1 transition-opacity ml-auto">
                      <span className="material-symbols-outlined text-sm">edit_note</span> Try Answering
                    </button>
                  </div>
                </div>

                <div className="border border-white/10 bg-white/5 rounded-xl p-5 transition-all hover:border-white/20">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-medium text-white">Describe RESTful API principles.</h3>
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-purple-900/30 text-purple-300 border border-purple-800/50">
                      Backend
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    What are the main HTTP methods used in a REST API, and what operations do they correspond to? Explain statelessness.
                  </p>

                  <div className="mb-4">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-purple-900/30 text-purple-300 mb-2">
                      Intention
                    </span>
                    <p className="text-sm text-gray-400 italic">
                      To verify understanding of standard web architecture and communication protocols between client and server.
                    </p>
                  </div>

                  <div className="mb-4">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-green-900/30 text-green-300 mb-2">
                      Model Answer
                    </span>
                    <p className="text-sm text-gray-300">
                      REST (Representational State Transfer) relies on stateless communication and standard HTTP methods: GET (Read), POST (Create),
                      PUT/PATCH (Update), and DELETE (Remove). Statelessness means each request from a client must contain all the information
                      necessary to understand and complete the request, without relying on stored context on the server.
                    </p>
                  </div>

                  <div className="flex items-center gap-4 border-t border-white/10 pt-4 mt-2">
                    <button className="text-xs font-medium text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
                      <span className="material-symbols-outlined text-sm">visibility</span> Show Hint
                    </button>
                    <button className="text-xs font-medium text-white hover:opacity-80 flex items-center gap-1 transition-opacity ml-auto">
                      <span className="material-symbols-outlined text-sm">edit_note</span> Try Answering
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. BEHAVIORAL QUESTIONS SECTION */}
          {activeTab === "behavioral" && (
            <div className="bg-[#171717] bg-opacity-80 backdrop-blur-md rounded-2xl p-6 lg:p-8 shadow-sm border border-white/5">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-white">Behavioral Questions</h2>

              <div className="space-y-6">
                <div className="border border-white/10 bg-white/5 rounded-xl p-5 transition-all hover:border-white/20">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-medium text-white">Tell me about a time you faced a conflict in a team.</h3>
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-900/30 text-blue-300 border border-blue-800/50">
                      Teamwork
                    </span>
                  </div>

                  <div className="mb-4">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-purple-900/30 text-purple-300 mb-2">
                      Intention
                    </span>
                    <p className="text-sm text-gray-400 italic">
                      To assess your conflict resolution skills, emotional intelligence, and ability to collaborate professionally under stress.
                    </p>
                  </div>

                  <div className="mb-4">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-green-900/30 text-green-300 mb-2">
                      Model Answer
                    </span>
                    <p className="text-sm text-gray-300">
                      Use the STAR method (Situation, Task, Action, Result). Focus on resolving the issue professionally rather than assigning blame.
                      Highlight your ability to listen to the other person's perspective, find common ground, and achieve a positive outcome that
                      benefited the project.
                    </p>
                  </div>
                </div>

                <div className="border border-white/10 bg-white/5 rounded-xl p-5 transition-all hover:border-white/20">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-medium text-white">Describe a difficult technical challenge you encountered.</h3>
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-yellow-900/30 text-yellow-300 border border-yellow-800/50">
                      Problem Solving
                    </span>
                  </div>

                  <div className="mb-4">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-purple-900/30 text-purple-300 mb-2">
                      Intention
                    </span>
                    <p className="text-sm text-gray-400 italic">
                      To evaluate your problem-solving methodology, perseverance, and how you approach debugging or learning new concepts.
                    </p>
                  </div>

                  <div className="mb-4">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-green-900/30 text-green-300 mb-2">
                      Model Answer
                    </span>
                    <p className="text-sm text-gray-300">
                      Choose a specific, non-trivial problem. Explain the steps you took to isolate the root cause, the resources you consulted
                      (documentation, colleagues), and the rationale behind your chosen solution. Discuss what you learned from the experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. LEARNING ROADMAP SECTION */}
          {activeTab === "roadmap" && (
            <div className="bg-[#171717] bg-opacity-80 backdrop-blur-md rounded-2xl p-6 lg:p-8 shadow-sm border border-white/5">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-white">Learning Roadmap</h2>

              <div className="space-y-6">
                <div className="border-l-2 border-white/20 pl-4 py-2 relative">
                  <div className="absolute w-2.5 h-2.5 rounded-full bg-white -left-[6px] top-4"></div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 text-xs font-bold rounded bg-white/10 text-white">Day 1</span>
                    <h3 className="text-lg font-medium text-white">TypeScript & State Management Mastery</h3>
                  </div>
                  <ul className="space-y-3 mt-4 pl-2">
                    <li className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="material-symbols-outlined text-[18px] text-gray-500 mt-0.5">task :</span>
                      <span>Review TypeScript configuration files (tsconfig.json) and compiler options.</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="material-symbols-outlined text-[18px] text-gray-500 mt-0.5">task :</span>
                      <span>Build a small counter app using Redux Toolkit to refresh core concepts.</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="material-symbols-outlined text-[18px] text-gray-500 mt-0.5">task :</span>
                      <span>Implement Zustand in a sample project and compare it with Redux boilerplate.</span>
                    </li>
                  </ul>
                </div>

                <div className="border-l-2 border-white/20 pl-4 py-2 relative">
                  <div className="absolute w-2.5 h-2.5 rounded-full bg-white -left-[6px] top-4"></div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 text-xs font-bold rounded bg-white/10 text-white">Day 2</span>
                    <h3 className="text-lg font-medium text-white">Unit Testing Fundamentals</h3>
                  </div>
                  <ul className="space-y-3 mt-4 pl-2">
                    <li className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="material-symbols-outlined text-[18px] text-gray-500 mt-0.5">task :</span>
                      <span>Set up Jest and React Testing Library in a starter repository.</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="material-symbols-outlined text-[18px] text-gray-500 mt-0.5">task :</span>
                      <span>Write tests for common utility functions and custom hooks.</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="material-symbols-outlined text-[18px] text-gray-500 mt-0.5">task :</span>
                      <span>Practice mocking API calls and user interactions in component tests.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Right Sidebar - Stats & Gaps (Always Visible) */}
        <aside className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-6">
          {/* Overall Match Widget */}
          <div
            className={`bg-[#171717] bg-opacity-80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/10 text-center transition-all duration-[800ms] ease-out transform ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">Overall Match</h3>

            {/* Circular Progress SVG */}
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
              Strong match for <span className="font-semibold text-white">Frontend Developer</span> role.
            </p>
          </div>

          {/* Skill Gaps Widget */}
          <div className="bg-[#171717] bg-opacity-80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-orange-500">warning</span>
              <h3 className="font-semibold text-white">Identified Skill Gaps</h3>
            </div>
            <p className="text-xs text-gray-400 mb-4">Based on your resume vs. job description, consider reviewing these areas:</p>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-orange-500 flex-shrink-0"></div>
                <div>
                  <span className="block text-sm font-medium text-white">TypeScript Configuration</span>
                  <span className="block text-xs text-gray-400 mt-0.5">Mentioned in JD, missing from resume.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-orange-500 flex-shrink-0"></div>
                <div>
                  <span className="block text-sm font-medium text-white">State Management (Redux/Zustand)</span>
                  <span className="block text-xs text-gray-400 mt-0.5">Experience looks light compared to requirements.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0"></div>
                <div>
                  <span className="block text-sm font-medium text-white">Unit Testing (Jest)</span>
                  <span className="block text-xs text-gray-400 mt-0.5">Good to brush up before technical round.</span>
                </div>
              </li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Report;
