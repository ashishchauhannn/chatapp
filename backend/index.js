import express from "express";
import db from './config/database.js';
// const database = require("./config/database")
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from "dotenv";
import messageRoute from './routes/messageRoute.js';
import userRoute from './routes/userRoute.js';
dotenv.config({})
const app = express();
const PORT = process.env.PORT || 8080;


// middleware 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

const corsOption = {

    origin: 'http://localhost:3000',
    credentials: true
};
//api calls
app.use(cors(corsOption));
app.use("/api/v1/user", userRoute)
app.use("/api/v1/message", messageRoute)



app.listen(PORT, () => {
    db();
    console.log("server running.")
})

