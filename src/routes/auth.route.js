import {Router} from "express"
import { register, login,refreshToken,getUser,logout } from '../controllers/auth.controller.js';

const authRouter = Router()

//User registration
authRouter.post("/register",register)

authRouter.post("/login",login)


//This is the refresh api which is used to request server to generate a new accessToken using refreshToken when hit in this api
authRouter.get("/refresh-token",refreshToken)

//This is the end-point for showing the details of the user , which requested/registered in the server
authRouter.get("/get-user",getUser)

authRouter.get("/logout",logout)



export default authRouter