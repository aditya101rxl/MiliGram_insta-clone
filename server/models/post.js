import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    name: String,
    username: String,
    message: String,
    file: String,
    tags: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    likes: {
        type: [String],
        default: []
    },
    comments: {
        type: [Object],
        default: []
    }
})

const Post = mongoose.model('Post', postSchema);

export default Post;