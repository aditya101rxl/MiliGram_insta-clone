import express from 'express';
import { signin, signup, findUser, updateProfile, follow } from '../controller/user.js';
import { auth } from '../middleware/auth.js';


const router = express.Router();


router.post('/signin', signin)
router.post('/signup', signup)
router.patch('/follow', auth, follow)
router.get('/profile/:username', findUser);
router.patch('/profile/update/:id', auth, updateProfile)

export default router;