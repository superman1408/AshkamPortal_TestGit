import express from 'express';

import { signin, signup } from '../controllers/user.js';


const router = express.Router();


router.get('/signin', signin);

router.get('/signup', (req, res) => {
    res.status(200).send("Sign IN command")
});


export default router;
