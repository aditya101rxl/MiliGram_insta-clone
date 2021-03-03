import express from 'express';
import { auth } from '../middleware/auth.js';
import { createPost, getPosts } from '../controller/post.js';


const router = express.Router();


router.get('/', getPosts)
router.post('/createPost', auth, createPost)

export default router