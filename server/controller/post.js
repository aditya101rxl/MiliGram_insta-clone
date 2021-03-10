import Post from '../models/post.js';


export const getPosts = async (req, res) => {

    try {
        const allPosts = await Post.find().sort({ $natural: -1 });
        return res.send(allPosts);
    } catch (error) {
        return res.send({ message: "somethings went wrong." });
    }
}

export const createPost = async (req, res) => {

    if (!req.userId) return res.send("Unauthorized User")
    const postData = req.body;
    const newPost = Post(postData)
    try {
        await newPost.save();
        return res.send(newPost);
    } catch (error) {
        return res.send({ message: 'something went wrong.' })
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

export const deletePost = async (req, res) => {
    const { _id } = req.params;
    await Post.findByIdAndRemove(_id);
    res.send({ message: "Post deleted successfully.." })
}