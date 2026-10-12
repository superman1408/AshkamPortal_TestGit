import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouters from "./routes/user.js";
import postsRouters from "./routes/posts.js";
import mailRouters from "./routes/mail.js";
import attendRouters from "./routes/attendence.js";
import timesheetRouters from "./routes/timesheet.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";
// const HOST = process.env.HOST || "localhost";

const CONNECT = process.env.CONNECTION_URL;

// const projectCodes = process.env.PROJECT_CODES;

const projectCodes = (process.env.PROJECT_CODES || "")
  .split(",")
  .map(code => code.trim())
  .filter(Boolean);

app.use(express.static("client"));
app.use(bodyParser.json({ limit: "35mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "35mb", extended: true }));
app.use(cors());

app.use("/user", userRouters);
app.use("/posts", postsRouters);
app.use("/mail", mailRouters);
app.use("/attend", attendRouters);
app.use("/timesheet", timesheetRouters);

// app.get("/", (req, res) => {
//   res.send("Hello to ASHKAM  API");
// });


// app.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "ASHKAM API is running successfully.",
//     status: "Operational"
//   });
// });



app.get("/", (req, res) => {
  res.status(200).send(`
    <html>
      <head>
        <title>ASHKAM | API Services</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #f4f7fb;
            color: #16355d;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            text-align: center;
          }
          .container {
            background: #ffffff;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            max-width: 500px;
            margin: 20px;
          }
          h1 {
            margin-bottom: 12px;
          }
          p {
            color: #555;
            line-height: 1.6;
          }
          .status {
            color: #16803c;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>ASHKAM ENERGY PVT LTD</h1>
          <p>Welcome to ASHKAM API Services.</p>
          <p class="status">● Server is running</p>
          <p>Our services are available to authorized applications.</p>
        </div>
      </body>
    </html>
  `);
});



// app.get("/projects", (req, res) => {
//   res.json(projectCodes);
// });


app.get("/projects", (req, res) => {
  // Return JSON to API clients
  if (!req.accepts("html")) {
    return res.json(projectCodes);
  }

  // Format project codes for browser display
  const codes = projectCodes
    .map(code => String(code).trim())
    .filter(Boolean);

  res.type("html").send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ASHKAM-ERP | Project Codes</title>
      <style>
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 30px 16px;
          font-family: Arial, sans-serif;
          background: #f4f7fb;
          color: #16355d;
        }

        .container {
          max-width: 900px;
          margin: 30px auto;
          background: #ffffff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        h1 {
          margin: 0 0 8px;
          font-size: 28px;
        }

        .subtitle {
          color: #64748b;
          margin-bottom: 24px;
        }

        .summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 20px;
          padding: 16px;
          background: #eef4fb;
          border-radius: 8px;
        }

        .count {
          font-size: 24px;
          font-weight: bold;
        }

        .status {
          color: #16803c;
          font-weight: bold;
        }

        .codes {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
          gap: 12px;
        }

        .code {
          padding: 14px 8px;
          text-align: center;
          background: #ffffff;
          border: 1px solid #dbe4ef;
          border-radius: 8px;
          font-weight: 600;
          color: #16355d;
          overflow-wrap: anywhere;
        }

        .code:hover {
          background: #eef4fb;
          border-color: #16355d;
        }

        footer {
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid #e2e8f0;
          color: #64748b;
          font-size: 13px;
          text-align: center;
        }

        @media (max-width: 480px) {
          .container {
            padding: 20px;
          }

          h1 {
            font-size: 23px;
          }
        }
      </style>
    </head>
    <body>
      <main class="container">
        <h1>ASHKAM-ERP</h1>
        <p class="subtitle">Project Codes Directory</p>

        <section class="summary">
          <div>
            <div class="count">${codes.length}</div>
            <div>Available Project Codes</div>
          </div>
          <div class="status">● Endpoint Available</div>
        </section>

        <section class="codes">
          ${codes.map(code =>
            `<div class="code">${code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>`
          ).join("")}
        </section>

        <footer>
          ASHKAM ENERGY PVT LTD API Services &copy; ${new Date().getFullYear()}
        </footer>
      </main>
    </body>
    </html>
  `);
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

mongoose.set("strictQuery", true);

mongoose
  .connect(CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, HOST, () => {
      console.log(
        "Listening at " +
          `http://${HOST}:${PORT}` +
          "\nMongoDB database is connected..!!",
      );
    }),
  )
  .catch((error) => console.log(error));
