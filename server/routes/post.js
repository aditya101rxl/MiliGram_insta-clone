import express from 'express';
import { auth } from '../middleware/auth.js';
import { createPost, getPosts, like, comment, deletePost, findPost } from '../controller/post.js';


const router = express.Router();


router.get('/', getPosts)
router.get('/:_id', findPost)
router.post('/createPost', auth, createPost)
router.patch('/like', auth, like)
router.post('/comment', auth, comment)
router.delete('/:_id', auth, deletePost);

export default router