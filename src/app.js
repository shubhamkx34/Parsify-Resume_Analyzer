import express from "express";
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser'

const app = express();

app.use(cookieParser())
app.use(express.json()) //Middleware used to read req.body 

//Authentication Api's
app.use("/api/auth",authRouter)

export default app
