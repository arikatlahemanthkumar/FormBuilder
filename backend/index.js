import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import configureDB from "./config/db.js"
import formRoutes from "./routes/formRoutes.js"

const app = express()

dotenv.config()
configureDB()

app.use(express.json())
app.use(cors());
app.use("/api",formRoutes)

const PORT = process.env.PORT 
app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`)  
}) 