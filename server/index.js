import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouters from "./routes/user.js";
import postsRouters from "./routes/posts.js";
import mailRouters from "./routes/mail.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8080;

const CONNECT = process.env.CONNECTION_URL;

app.use(express.static("client"));
app.use(bodyParser.json({ limit: "35mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "35mb", extended: true }));
app.use(cors());

app.use("/user", userRouters);
app.use("/posts", postsRouters);
app.use("/mail", mailRouters);

app.get("/", (req, res) => {
  res.status(200).send("Hello to ASHKAM  API");
  console.log("Super is here..!!");
});

mongoose.set("strictQuery", true);
mongoose
  .connect(CONNECT, { useNewUrlParser: true }, { useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(
        "Listening at " + PORT + "\nMongoDB database is connected..!!"
      );
    })
  )
  .catch((error) => console.log(error));
