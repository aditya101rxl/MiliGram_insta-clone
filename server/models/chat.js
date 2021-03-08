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
    message: {
        type: [Object],
        default: []
    }
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);
export default Chat