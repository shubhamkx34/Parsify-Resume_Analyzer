import "dotenv/config"; 
import app from './src/app.js'
import connectToDB from "./src/config/db.js";

connectToDB()

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server Live on port ${PORT}!!!`);
})