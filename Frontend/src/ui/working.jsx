import React from "react";
import LightRays from "./components/LightRays";
import ScrollStack, { ScrollStackItem } from "./components/scrollStack";

const Working = () => {
  return (
    <div className="h-screen w-screen relative z-0 bg-slate-950 text-white overflow-hidden font-sans">
      

      <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
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
          className="custom-rays"
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>


      <div className="relative z-10 h-full w-full">
        <ScrollStack
          itemDistance={50}
          itemStackDistance={30}
          baseScale={0.85}
          itemScale={0.03}
          blurAmount={4}
         className="w-full h-full max-w-4xl mx-auto px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {/* Page Header (Sits at the top of the scrollable container) */}
          <div className="text-center mb-12 pt-6">
          
            <h1 className="text-5xl font-[font2] font-bold mt-2 tracking-wide">
              How Our <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">Resume Analyzer</span> Works
            </h1>
            <p className="text-gray-400 mt-3 text-lg max-w-xl mx-auto">
              Scroll down to see how our AI evaluates your career data and builds your custom interview strategy in seconds.
            </p>
          </div>

          {/* STEP 1: RESUME UPLOAD */}
          <ScrollStackItem itemClassName="bg-slate-900/90 border border-slate-800 backdrop-blur-md flex flex-col justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="flex items-center space-x-4 mb-4">
              <span className="px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-sm">
                Step 01
              </span>
              <h2 className="text-3xl font-bold text-white">Upload Your PDF Resume</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Drop your latest resume into the upload zone. Our system cleanly parses your text, work history, and formatting exactly as an Applicant Tracking System (ATS) would—ensuring no critical details are missed.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400 border-t border-slate-800/80 pt-4">
              <span>✓ ATS Parsing Verification</span>
              <span>✓ 3MB File Limit</span>
              <span>✓ 100% In-Memory Privacy</span>
            </div>
          </ScrollStackItem>

          {/* STEP 2: JOB DESCRIPTION */}
          <ScrollStackItem itemClassName="bg-slate-900/90 border border-slate-800 backdrop-blur-md flex flex-col justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="flex items-center space-x-4 mb-4">
              <span className="px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-sm">
                Step 02
              </span>
              <h2 className="text-3xl font-bold text-white">Paste the Job Description</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Copy and paste the exact requirements, skills, and daily responsibilities of the role you are targeting. This gives the AI the exact benchmark it needs to evaluate your profile against the employer's expectations.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400 border-t border-slate-800/80 pt-4">
              <span>✓ Keyword Extraction</span>
              <span>✓ Required Tech Stack Mapping</span>
              <span>✓ Seniority Level Matching</span>
            </div>
          </ScrollStackItem>

          {/* STEP 3: SELF DESCRIPTION (YOUR SECRET WEAPON) */}
          <ScrollStackItem itemClassName="bg-slate-900/90 border border-cyan-500/50 backdrop-blur-md flex flex-col justify-center shadow-[0_0_30px_rgba(34,211,238,0.15)]">
            <div className="flex items-center space-x-4 mb-4">
              <span className="px-4 py-1 rounded-full bg-cyan-500 text-black font-extrabold text-sm">
                Step 03 • Unique Feature
              </span>
              <h2 className="text-3xl font-bold text-white">Add Your Self-Description</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Standard parsers miss context. Use our custom context box to explain what you actually built in your college projects, your domain passion (like DeFi or Full-Stack), or why you are transitioning careers. The AI uses this to find hidden strengths your resume might not highlight.
            </p>
            <div className="flex space-x-6 text-sm text-cyan-300/80 border-t border-slate-800/80 pt-4">
              <span>★ Enhances Project Context</span>
              <span>★ Covers Career Gaps</span>
              <span>★ Boosts Match Accuracy</span>
            </div>
          </ScrollStackItem>

          {/* STEP 4: AI DEEP SCAN */}
          <ScrollStackItem itemClassName="bg-slate-900/90 border border-slate-800 backdrop-blur-md flex flex-col justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="flex items-center space-x-4 mb-4">
              <span className="px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-sm">
                Step 04
              </span>
              <h2 className="text-3xl font-bold text-white">AI Deep-Scan & Evaluation</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Once you click generate, our semantic analysis engine cross-examines all three inputs simultaneously. It doesn't just do mindless word-matching; it understands technical relationships (e.g., knowing that Express.js qualifies as backend Node.js experience).
            </p>
            <div className="flex space-x-6 text-sm text-gray-400 border-t border-slate-800/80 pt-4">
              <span>⚡ Microsecond Processing</span>
              <span>🧠 Semantic Understanding</span>
              <span>🔒 Zero Data Retention</span>
            </div>
          </ScrollStackItem>

          {/* STEP 5: ACTIONABLE REPORT */}
          <ScrollStackItem itemClassName="bg-slate-900/90 border border-slate-800 backdrop-blur-md flex flex-col justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="flex items-center space-x-4 mb-4">
              <span className="px-4 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 font-bold text-sm">
                Step 05
              </span>
              <h2 className="text-3xl font-bold text-white">Get Your Interview Roadmap</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Receive your final downloadable report. Discover your exact 0–100% match score, see which required tools you need to brush up on, practice with custom technical and behavioural interview questions predicted from your projects, and follow a Day-Wise study plan to ace the interview.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400 border-t border-slate-800/80 pt-4">
              <span>📈 Overall Match Score</span>
              <span>💡 Custom Interview Questions</span>
              <span>🗺️ Day-Wise Study Plan</span>
            </div>
          </ScrollStackItem>

        </ScrollStack>
      </div>

    </div>
  );
};

export default Working;