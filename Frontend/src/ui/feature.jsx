import Prism from "./components/prism";
import AnimatedList from "./components/animatedList";
const Feature = () => {
  const items = [
    <span key="1" className="block">
      <strong className="text-lg font-semibold text-amber-400 block mb-1">⚡ Instant ATS Match Score</strong>
      <span className="text-sm text-gray-300 block">
        Calculates a precise 0–100% compatibility rating against any target job description in seconds.
      </span>
    </span>,

    <span key="2" className="block">
      <strong className="text-lg font-semibold text-amber-400 block mb-1">🎯 Skill Gap Analysis</strong>
      <span className="text-sm text-gray-300 block">
        Identifies exact missing programming languages, frameworks, and tools required by employers.
      </span>
    </span>,

    <span key="3" className="block">
      <strong className="text-lg font-semibold text-amber-400 block mb-1">💡 AI Interview Question Predictor</strong>
      <span className="text-sm text-gray-300 block">
        Generates custom technical and behavioral interview questions based on the specific projects in your resume.
      </span>
    </span>,

    <span key="4" className="block">
      <strong className="text-lg font-semibold text-amber-400 block mb-1">🗺️ Step-by-Step Prep Roadmap</strong>
      <span className="text-sm text-gray-300 block">
        Builds a personalized, structured study plan to help you master your weak areas before interview day.
      </span>
    </span>,

    <span key="5" className="block">
      <strong className="text-lg font-semibold text-amber-400 block mb-1">🧠 Self-Description Context Engine</strong>
      <span className="text-sm text-gray-300 block">
        Analyzes your personal background summary alongside your resume to understand your career transition and hidden strengths.
      </span>
    </span>,

    <span key="6" className="block">
      <strong className="text-lg font-semibold text-amber-400 block mb-1">📝 Action Verb Optimizer</strong>
      <span className="text-sm text-gray-300 block">
        Upgrades weak bullet points into high-impact, measurable achievements that catch a recruiter's eye.
      </span>
    </span>,

    <span key="7" className="block">
      <strong className="text-lg font-semibold text-amber-400 block mb-1">📄 PDF Layout & ATS Parsing Check</strong>
      <span className="text-sm text-gray-300 block">
        Verifies that your PDF formatting, fonts, and sections can be read cleanly by automated recruitment software.
      </span>
    </span>,

    <span key="8" className="block">
      <strong className="text-lg font-semibold text-amber-400 block mb-1">🔬 Domain-Specific Tailoring</strong>
      <span className="text-sm text-gray-300 block">
        Adapts evaluation criteria whether you are applying for Web Backend, Blockchain/DeFi, or Hardware Engineering roles.
      </span>
    </span>,

    <span key="9" className="block">
      <strong className="text-lg font-semibold text-amber-400 block mb-1">📊 Downloadable Final Reports</strong>
      <span className="text-sm text-gray-300 block">
        Generates a clean, comprehensive report summarizing your scores, gaps, and study plans for offline review.
      </span>
    </span>,

    <span key="10" className="block">
      <strong className="text-lg font-semibold text-amber-400 block mb-1">🔒 100% Data Privacy & Security</strong>
      <span className="text-sm text-gray-300 block">
        Processes your PDF entirely in temporary server memory without saving, sharing, or selling your career data.
      </span>
    </span>,
  ];
  return (
    <div className="h-screen w-screen  relative z-0 bg-slate-950  text-white ">
      <div style={{ width: "100%", height: "100%", position: "absolute" }}>
        <Prism animationType="rotate" timeScale={0.5} height={3.5} baseWidth={5.5} scale={3.6} hueShift={0} colorFrequency={1} noise={0} glow={1} />
      </div>

      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center">
        <h1 className="text-5xl font-[font2] mb-15">
          Why Use Our <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]"> Resume Analyzer</span>?
        </h1>

        <AnimatedList
          items={items}
          onItemSelect={(item, index) => console.log(item, index)}
          showGradients
          enableArrowNavigation
          displayScrollbar={false}
        />
      </div>
    </div>
  );
};

export default Feature;
