import express, { Router } from 'express';
import cors from 'cors';
import connectDB from './Database/dbConfig.js';
import mentrouter from './Routers/mentor.router.js';
import studrouter from './Routers/student.mentor.js';
import dotenv from 'dotenv';
dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());
app.use('/task2',mentrouter)
app.use('/task2',studrouter)
connectDB();
const port=process.env.PORT 

app.listen(port,()=>{
    console.log(port);
})

