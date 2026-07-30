import express from "express";
import authRouter from './routes/auth.route.js';
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import uploadRouter from "./routes/UPFE_Data.route.js";


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

//User Upload's Api
app.use("/api",uploadRouter)

export default app
