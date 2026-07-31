# Parsify — Resume Analyzer

Parsify is a full-stack MERN application that analyzes a user's resume, self-description, and a target job description to generate a structured, AI-powered interview preparation report.

## Features

- **Interview Report Generation** — Generates a structured interview-prep report including a match score, technical and behavioral questions (with intentions and model answers), skill-gap analysis with severity levels, and a day-wise preparation plan.
- **Report Management** — Create, retrieve by ID, and fetch all previously generated reports, with rehydration logic to reliably reconstruct and display past reports.
- **PDF Export** — Converts AI-generated reports into downloadable, formatted PDF documents using Puppeteer.
- **User Authentication** — Custom authentication system with dedicated User and Session models, and middleware-protected API routes.
- **Structured AI Output** — Uses Zod schemas to validate and enforce structured output from the AI providers.
- **Multi-Provider AI Integration** — Integrates with both Groq (Llama models) and Google Gemini for report generation.

## Tech Stack

**Frontend:** React.js, React Router, Context API, Custom Hooks
**Backend:** Node.js, Express.js, MongoDB, Mongoose
**AI:** Groq SDK (Llama models), Google Gemini, Zod
**PDF Generation:** Puppeteer
**Auth:** Custom middleware-based authentication with session management

## Project Structure

```
Backend/
└── src/
    ├── controllers/
    │   ├── auth.controller.js
    │   └── UPFE_Data.controller.js
    ├── middlewares/
    │   ├── auth.middleware.js
    │   └── file.middleware.js
    ├── models/
    │   ├── finalReportModel.js
    │   ├── sessionModel.js
    │   └── userModel.js
    ├── routes/
    │   ├── auth.route.js
    │   └── UPFE_Data.route.js
    ├── services/
    │   ├── ai.service.js
    │   └── aiServiceGemini.js
    └── app.js

Frontend/
└── src/
    ├── auth/
    │   ├── components/
    │   ├── context/
    │   ├── hooks/
    │   ├── pages/
    │   └── services/
    ├── ui/
    │   ├── components/
    │   ├── context/
    │   │   └── UPFE_Data.context.jsx
    │   ├── hooks/
    │   │   └── useUPFE_Data.js
    │   ├── pages/
    │   │   ├── feature.jsx
    │   │   ├── home.jsx
    │   │   ├── report.jsx
    │   │   └── working.jsx
    │   └── services/
    │       └── UPFE_Data.api.js
    ├── App.jsx
    └── app.routes.jsx
```

## How It Works

1. The user submits their resume, a self-description, and a target job description.
2. The backend processes the input and generates a structured report via the integrated AI providers.
3. The report is validated against a Zod schema, stored in MongoDB, and made available for retrieval.
4. The user views the report on the frontend, can revisit past reports (via rehydration logic), or download it as a PDF.
