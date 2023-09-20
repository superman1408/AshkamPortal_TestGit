import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRouters from './routes/user.js';




const app = express();
dotenv.config();

const PORT = process.env.PORT || 5050;
const CONNECT = process.env.CONNECTION_URL;
app.use(express.static("client"));
app.use(bodyParser.json({ extended: true, limit: '35mb' }));
app.use(bodyParser.urlencoded({ extended:true, limit: '35mb'}));
app.use(cors());


app.get('/user', userRouters);




app.get('/', (req, res) => {
    res.status(200).send('I am a SuperMan');
});


mongoose.set('strictQuery', true);
mongoose.connect(CONNECT, { useNewUrlParser: true }, { useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => { console.log('Listening at ' + PORT + '\nMongoDB database is connected..!!')}))
    .catch((error) => console.log(error));