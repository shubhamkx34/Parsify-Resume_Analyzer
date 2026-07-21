import {Router} from "express"
import { register, login } from '../controllers/auth.controller.js';

const authRouter = Router()

//User registration
authRouter.post("/register",register)

authRouter.post("/login",login)



export default authRouter