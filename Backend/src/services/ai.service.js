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
  const systemPrompt = `You are an expert HR and Technical Interviewer AI. Evaluate the candidate's profile against the job description and output an interview report in JSON format.

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