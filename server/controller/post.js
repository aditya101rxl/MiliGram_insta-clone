import mongoose from 'mongoose';
import Post from '../models/post.js';
import User from '../models/user.js';


export const getPosts = async (req, res) => {

    try {
        const allPosts = (await Post.find()).reverse();
        return res.status(200).json(allPosts);
    } catch (error) {
        return res.status(500).jsom({ message: "somethings went wrong." });
    }
}


export const createPost = async (req, res) => {

    if (!req.userId) return res.send("Unauthorized User")
    const postData = req.body;
    const newPost = Post({ ...postData, createdAt: new Date().toISOString() })
    try {
        await newPost.save();
        const { tags, message, file, comments, likes, createdAt } = newPost;
        await User.updateOne({ username: newPost.username }, { $push: { posts: { tags, message, file, comments, likes, createdAt } } });
        return res.status(200).json(newPost);
    } catch (error) {
        return res.status(500).json({ message: 'something went wrong.' })
    }
}

export const like = async (req) => {
    const { _id, username, islike } = req.body;
    if (islike) {
        await Post.findByIdAndUpdate(_id, { $push: { likes: username } });
    } else {
        await Post.findByIdAndUpdate(_id, { $pull: { likes: username } });
    }
}

export const comment = async (req) => {
    const { _id, comment } = req.body;
    await Post.findByIdAndUpdate(_id, { $push: { comments: comment } });
}