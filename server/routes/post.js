import express from 'express';
import { auth } from '../middleware/auth.js';
import { createPost, getPosts, like, comment } from '../controller/post.js';


const router = express.Router();


router.get('/', getPosts)
router.post('/createPost', auth, createPost)
router.patch('/like', auth, like)
router.post('/comment', auth, comment)

export default router