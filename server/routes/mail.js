import express from "express";

import { sendMail } from "../controllers/mail.js";
import { sendData } from "../controllers/posts.js";
import { updatedStatus } from "../controllers/posts.js";


const router = express.Router();

router.post("/sendmail", sendMail);

router.post("/:id/mailData", sendData);

router.post("/:id/status", updatedStatus);



export default router;
