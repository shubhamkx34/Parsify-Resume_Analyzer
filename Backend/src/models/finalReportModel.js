import mongoose from "mongoose";

//Ai Response of Technical Questions Schema:
const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Technical Question is required "],
    },
    intention: {
      type: String,
      required: [true, "Intention is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  {
    _id: false,
  },
);

const behavioralQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Technical Question is required "],
    },
    intention: {
      type: String,
      required: [true, "Intention is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  {
    _id: false,
  },
);

const skillGapSchema = new mongoose.Schema({
  skill: {
    type: String,
    required: [true, "Skill is required"],
  },
  severity: {
    type: String,
    enum: ["low", "medium", "high"],
    required: [true, "Severity is required"],
  },
});

const preparationPlanSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: [true, "Day is required"],
  },
  focus: {
    type: String,
    required: [true, "Focus is required"],
  },
  tasks: [
    {
      type: String,
      required: [true, "Task is required"],
    },
  ],
});


const finalReportSchema = new mongoose.Schema({
  //Target Job Position
  jobDescription: {
    type: String,
    required: [true, "Job Description Required"],
  },

  //users Resume Pdf
  resume: {
    type: String,
  },

  //what skills user have
  selfDescription: {
    type: String,
  },
  matchScore: {
    type: Number,
    min: 0,
    max: 100,
  },
technicalQuestions :[technicalQuestionSchema],
behavioralQuestions: [behavioralQuestionSchema],
skillGaps: [skillGapSchema],
preparationPlan:[preparationPlanSchema]
},{
    timestamps: true  //timestamps: true is a built-in Mongoose feature that automatically tracks time for your database records
});


const finalReportModel = mongoose.model("ResumeReport",finalReportSchema)

export default finalReportModel