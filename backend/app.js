import express from 'express';
import env from 'dotenv';
import cors from 'cors';
import teachersRouter from './routes/teachersRoute.js';
import studentsRouter from './routes/studentsRoute.js';
env.config(); 
const app =express();
app.use(cors());
app.use(express.json());
app.use('/teachers',teachersRouter);
app.use('/students',studentsRouter);

app.use('/',(req,res)=>{
    res.send("server is working fine...");
});

const port = process.env.SERVER_PORT;

app.listen(port,()=>{
    console.log(`server is running on port:${port}`);
});

