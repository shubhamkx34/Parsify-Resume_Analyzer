import express ,{ Router } from 'express'
import {protectRoute} from "../middlewares/auth.middleware.js"
import upload from '../middlewares/file.middleware.js'
import {uploadData,fetchData,fetchAllData} from '../controllers/UPFE_Data.controller.js'



const uploadRouter = Router()

//Api to upload resume , self description and jobdescription from home
uploadRouter.post("/upload",protectRoute, upload.single("resume"), uploadData) 

//Api to fetch finalReport using reportId of a logged in user
uploadRouter.get("/fetch/:reportId",protectRoute,fetchData)

//Api to fetch all the reports of a specific user
uploadRouter.get("/fetch",protectRoute,fetchAllData)



export default uploadRouter