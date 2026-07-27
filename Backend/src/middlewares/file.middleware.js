import multer from "multer"


//Multer is a middleware used in Node.js to handle file uploads (like user resume PDFs) sent from your frontend or Postman.
const upload = multer({
    //Instead of saving the uploaded PDF onto your server's hard drive, it holds the file temporarily in your server's RAM memory (as a Buffer). This is useful when you want to quickly parse text out of a PDF or send it straight to an AI service without storing clutter on your disk.
    storage:multer.memoryStorage(),
    limits:{
        fileSize:3*1024*1024   //3MB Max pdf size of resume
    }
})

export default upload