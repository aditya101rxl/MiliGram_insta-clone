import mongoose from 'mongoose'

const chatSchema = mongoose.Schema({
    user1: {
        type: Object,
        require: true
    },
    user2: {
        type: Object,
        require: true
    },
    msgUpdate: {
        user: { type: String, default: null },
        count: { type: Number, default: 0 },
    },
    message: {
        type: [Object],
        default: []
    }
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);
export default Chat