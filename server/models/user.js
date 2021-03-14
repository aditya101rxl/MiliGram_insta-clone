import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: 'data:image/webp;base64,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' },
    status: { type: String, default: "miligram lover..." },
    followers: { type: [String], default: [] },
    following: { type: [String], default: [] },
    followRequest: { type: [], default: [] },
    pendingRequest: { type: [], default: [] },
    friends: { type: [mongoose.Types.ObjectId], ref: 'Chat' },
    notification: { type: [Object], default: [] },
    notificationCount: { type: Number, default: 0 }
}, { timestamps: true })

export default mongoose.model('User', userSchema);