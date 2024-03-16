import express from 'express';

import { signin, signup } from '../controllers/user.js';


const router = express.Router();


router.post('/signin', signin);

router.post('/signup/:code', signup);


export default router;
