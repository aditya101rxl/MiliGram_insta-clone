import express from 'express'
import { chatlist, sendMsg } from '../controller/inbox.js'
import { auth } from '../middleware/auth.js';


const router = express.Router();

router.post('/chatlist', auth, chatlist);
router.post('/sendmsg', auth, sendMsg);

export default router;