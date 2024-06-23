import express from "express";
import db from './config/database.js';
// const database = require("./config/database")
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import messageRoute from './routes/messageRoute.js';
import userRoute from './routes/userRoute.js';
dotenv.config({})
const app = express();
const PORT = process.env.PORT || 8080;


// middleware 

app.use(express.json())
app.use(cookieParser())
//
app.use("/api/v1/user", userRoute)
app.use("/api/v1/message", messageRoute)


app.listen(PORT, () => {
    db();
    console.log("server running.")
})

