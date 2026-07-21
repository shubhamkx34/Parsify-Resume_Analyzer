import "dotenv/config";
import mongoose from 'mongoose'


async function connectDB() {

  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("DB Connected!!")} 

  catch (err) { console.error("DB Connection Error: ", err)}
}

export default connectDB
  