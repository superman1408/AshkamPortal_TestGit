import express from 'express';

import { signin, signup, reset } from '../controllers/user.js';


const router = express.Router();


router.post('/signin', signin);

router.post('/signup/:code', signup);

router.patch('/reset', reset);


export default router;
