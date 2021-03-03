import express from 'express'
import { inbox } from '../controller/inbox.js'
import { auth } from '../middleware/auth.js';


const router = express.Router();

router.get('/', auth, inbox);

export default router;