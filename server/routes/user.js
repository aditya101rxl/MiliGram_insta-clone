import express from 'express';
import { getOtp, signin, signup, findUser, updateProfile } from '../controller/user.js';
import { confirmFollowRequest, sendFollowRequest, cancelFollowRequest } from '../controller/user.js';
import { auth } from '../middleware/auth.js';


const router = express.Router();


router.post('/getOtp', getOtp)
router.post('/signin', signin)
router.post('/signup', signup)

router.get('/profile/:username', findUser);
router.patch('/profile/update/:id', auth, updateProfile)

router.patch('/follow/sendRequest', auth, sendFollowRequest)
router.patch('/follow/confirmRequest', auth, confirmFollowRequest)
router.patch('/follow/cancelRequest', auth, cancelFollowRequest)

export default router;