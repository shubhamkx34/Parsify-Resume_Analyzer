import express ,{ Router } from 'express'
import {protectRoute} from "../middlewares/auth.middleware.js"
import upload from '../middlewares/file.middleware.js'
import {uploadData} from '../controllers/uploadData.controller.js'



const uploadRouter = Router()

uploadRouter.post("/",protectRoute, upload.single("resume"), uploadData) 


export default uploadRouter