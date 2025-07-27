import mysql2 from 'mysql2/promise';
import env from 'dotenv';
env.config();

export let db;

try{
    db = await mysql2.createConnection({
        host: process.env.HOST,
        port: process.env.PORT,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
        });
        console.log("database connected successfully..");
}catch(err){
    console.log("database connection failed..",err);
}