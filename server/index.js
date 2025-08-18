import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";


import userRouters from "./routes/user.js";
import postsRouters from "./routes/posts.js";
import mailRouters from "./routes/mail.js";
import attendRouters from "./routes/attendence.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

const CONNECT = process.env.CONNECTION_URL;

console.log(CONNECT);




app.use(express.static("client"));
app.use(bodyParser.json({ limit: "35mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "35mb", extended: true }));
app.use(cors());

app.use("/user", userRouters);
app.use("/posts", postsRouters);
app.use("/mail", mailRouters);
app.use("/attend", attendRouters);

app.get("/", (req, res) => {
  res.send("Hello to ASHKAM  API");
});

// // Route for handling file uploads
// app.post("/:id/salarySlipData", upload.single("pdf"), (req, res) => {
//   // Handle the uploaded file here
//   console.log(req.file); // Log information about the uploaded file
//   res.send("File uploaded successfully");
// });

// mongoose.set("strictQuery", true);
// mongoose
//   .connect(CONNECT, { useNewUrlParser: true }, { useUnifiedTopology: true })
//   .then(() =>
//     app.listen(PORT, () => {
//       console.log(
//         "Listening at " + PORT + "\nMongoDB database is connected..!!"
//       );
//     })
//   )
//   .catch((error) => console.log(error));


// app.listen(PORT, () => {
//   console.log(`Server is running at port: ${PORT}`);
  
// });


mongoose.set("strictQuery", true);

mongoose
  .connect(CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, HOST, () => {
      console.log(
        "Listening at " + `http://${HOST}:${PORT}` + "\nMongoDB database is connected..!!"
      );
    })
  )
  .catch((error) => console.log(error));
