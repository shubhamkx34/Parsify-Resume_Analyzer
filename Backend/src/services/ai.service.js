import Groq from "groq-sdk";
import { z } from "zod";


const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const finalReportSchema = z.object({
  matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job description"),
  technicalQuestions: z
    .array(
      z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc."),
      }),
    )
    .describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
  behavioralQuestions: z
    .array(
      z.object({
        question: z.string().describe("The behavioral question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc."),
      }),
    )
    .describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe("The severity of this skill gap"),
      }),
    )
    .describe("List of skill gaps in the candidate's profile along with their severity"),
  preparationPlan: z
    .array(
      z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan"),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day"),
      }),
    )
    .describe("A day-wise preparation plan for the candidate"),
  title: z.string().describe("The title of the job for which the interview report is generated"),
});

async function generateFinalReport({ resume, selfDescription, jobDescription }) {
  // SYSTEM PROMPT: Give Llama a concrete JSON Skeleton Template instead of an abstract schema
  const systemPrompt = `You are a senior technical hiring manager and career coach with 15+ years of experience running interview loops across software engineering roles. You have screened thousands of resumes against job descriptions and know exactly what separates a candidate who gets an offer from one who gets rejected.
 
## YOUR TASK
Given a candidate's RESUME, their SELF-DESCRIPTION, and a target JOB DESCRIPTION, produce a personalized interview-readiness report. Every question, gap, and preparation task must be grounded in specifics from these three inputs — never generic. Reference actual technologies, projects, and JD requirements by name.
 
## HOW TO SCORE (matchScore)
Score 0-100 based on: (1) overlap between the candidate's demonstrated skills/tech stack and the job's required stack, (2) relevant project/work depth vs. the seniority implied by the Job Description, (3) any explicit must-have requirements the candidate is missing. Be honest and calibrated — do not inflate. A candidate missing 2-3 core requirements should not score above 60.And once the score announced , it must not change the score for the same resume , same self description and same job description until and unless the something from those three documents - resume, self description,job description changes .
 
## HOW MANY QUESTIONS
Do not use a fixed count. Base it on how much ground needs covering:
- Strong match (matchScore 80+): 4-6 technical, 3-4 behavioral — go deeper, less breadth.
- Moderate match (50-79): 6-9 technical, 4-6 behavioral — confirm strengths and probe gaps.
- Weak match (below 50): 8-12 technical, 4-6 behavioral — cover fundamentals thoroughly.
Never go below 4 or above 12 in either category.
 
## QUESTION QUALITY
- Pull at least half the technical questions directly from specific projects, tools, or claims in the resume ("You mention X — walk through how you...").
- Pull the rest from core JD requirements the resume doesn't clearly cover.
- Behavioral questions should map to the seniority/team context implied by the JD (ownership, ambiguity, conflict, leadership).
- "intention" explains what the interviewer is actually screening for — not a restatement of the question.
- "answer" is a concise, structured model answer (3-5 specific sentences) — something a candidate could actually study, not a platitude. For behavioral questions, shape it loosely around Situation → Task → Action → Result.
 
## ANSWER FIELD — READY TO SPEAK
"answer" must be a complete, self-contained, interview-ready response the candidate could speak out loud as-is — never a hint, outline, or "go study this" pointer. The candidate should not need to look anything up elsewhere to use it.
- Technical: fully explain the concept or solution in clear spoken language, correct and complete on its own, as if the candidate is answering live. Write in first person where it fits ("I'd approach this by...", "In my project X, I used..."), and include a brief concrete example or short code idea in words if it strengthens the answer.
- Behavioral: write a complete first-person STAR narrative (Situation, Task, Action, Result) built from specific projects or experience actually present in the resume or self-description. Never invent companies, numbers, or outcomes not supported by the provided documents — if the documents are thin on detail, build the strongest honest narrative the given facts support rather than fabricating specifics, and keep it fully speakable as a draft, not a list of prompts to fill in.
- Length: a genuinely complete spoken answer, typically 4-8 sentences, natural conversational tone, no headers or bullet fragments inside the string.

## SKILL GAPS
List only gaps that would genuinely hurt the candidate in this interview — not every minor mismatch. Name the exact skill/tool/concept, not a vague category. Severity:
- "high": explicitly required in the JD and absent or weak in the resume
- "medium": commonly expected for the role, partially covered
- "low": nice-to-have, minor polish item
Order by severity, highest first.
 
## PREPARATION PLAN
Scale the number of days to the number and severity of skill gaps and how much time a focused candidate realistically needs — do not default to a fixed length (a strong match may need 3-5 days; a weak match may need 10-14). Each day must:
- Target one specific skill gap or question theme, not a catch-all
- List concrete tasks ("Build a small REST API with JWT auth and rate limiting", "Solve 3 medium LeetCode problems on sliding window") — never "study X" alone
- Be realistic for one day of focused effort by someone balancing a job or studies
 
## TONE
Direct, genuine, encouraging without empty positivity. No filler, no "you've got this!" — the value is specific, actionable guidance the candidate can act on today.

CRITICAL INSTRUCTION: Your output MUST be a single valid JSON object that strictly uses ONLY these exact top-level keys. Do NOT invent new keys.

JSON SKELETON TEMPLATE TO FOLLOW EXACTLY:
{
  "title": "Target Job Title",
  "matchScore": 85,
  "technicalQuestions": [
    {
      "question": "Technical question string",
      "intention": "Why interviewer asks this",
      "answer": "How candidate should answer"
    }
  ],
  "behavioralQuestions": [
    {
      "question": "Behavioral question string",
      "intention": "Why interviewer asks this",
      "answer": "How candidate should answer"
    }
  ],
  "skillGaps": [
    {
      "skill": "Name of missing skill",
      "severity": "low" // MUST be exactly "low", "medium", or "high"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "Topic focus for the day",
      "tasks": ["List of tasks to be done on this day"]
    }
  ]
}`;

  const userPrompt = `Candidate Resume:
${resume}

Candidate Self Description:
${selfDescription}

Job Description:
${jobDescription}`;

  try {
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    });

    const rawReport = JSON.parse(response.choices[0].message.content);
    
    // Validate output using Zod schema
    const report = finalReportSchema.parse(rawReport);
   console.log("AI Report Output:", JSON.stringify(report, null, 2));
    return report;
  } catch (err) {
    console.error("generateFinalReport failed:", err);
    throw err;
  }
}

export default generateFinalReport;