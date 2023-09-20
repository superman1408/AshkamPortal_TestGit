import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


const app = express();
dotenv.config();

const PORT = process.env.PORT || 5050;


app.listen(PORT,() => {console.log(`SERVER IS RUNNING AT PORT **${PORT}`)});