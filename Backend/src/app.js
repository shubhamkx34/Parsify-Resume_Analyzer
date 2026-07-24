import express from "express";
import authRouter from './routes/auth.route.js';
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app = express();

app.use(express.json()) //Middleware used to read req.body 
app.use(morgan("dev"))
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

//Authentication Api's
app.use("/api/auth",authRouter)

export default app
