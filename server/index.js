import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRouter from "./routes/posts.js";

import authRouter from "./routes/auth.js";

import mailRouter from "./routes/mail.js";

const app = express();

dotenv.config();

mongoose.set("strictQuery", false);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRouter);

app.use("/auth", authRouter);

app.use("/mail", mailRouter);

// CONNECTIONS_URL = mongodb+srv://dolphin:Dolphin@123@cluster0.kcvvjna.mongodb.net/?retryWrites=true&w=majority

const PORT = process.env.PORT || 5000;
// const CONNECTION_URL = 'mongodb+srv://user:rino2000@cluster0.kcvvjna.mongodb.net/?retryWrites=true&w=majority';

await mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running at PORT**: ${PORT}`))
  )
  .catch((error) => console.log(error));

// app.listen(PORT, () => console.log(`Server is Running at PORT** : ${PORT}`));
