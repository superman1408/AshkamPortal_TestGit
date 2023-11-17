import dotenv from "dotenv";
import { google } from "googleapis";
import nodemailer from "nodemailer";

// ________________________get operation___________________________

const OAuth2 = google.auth.OAuth2;

dotenv.config();

export const sendMail = async (req, res) => {
  console.log("Data is sending through API");
  console.log(process.env.SENDER_EMAIL);

    const recipients = req.body.recipient;
    const mailSubject = req.body.subject;
    const mailBody = req.body.requiredMessage;

    let mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: recipients,
      subject: mailSubject,
      text: mailBody,
    };

    try {
      let emailTransporter = await createTransporter();
      emailTransporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("email send" + info.response);
          res.status(200).json({ message: "Mail is sent..!!" });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createTransporter = async () => {
    const oauth2Client = new OAuth2(
      process.env.OAUTH_CLIENT_ID,
      process.env.OAUTH_CLIENT_SECRET,

      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.OAUTH_REFRESH_TOKEN,
    });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject("failure to create access token:(" + err);
        }
        resolve(token);
      });
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAUTH2",
        user: process.env.SENDER_EMAIL,
        accessToken,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    });

  return transporter;
};
