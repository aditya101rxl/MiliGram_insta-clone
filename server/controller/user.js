import User from '../models/user.js'
import Chat from '../models/chat.js'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../private.js'

export const signin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (!existingUser) return res.send({ message: "User doesn't exist" })
        if (existingUser.password !== password) return res.send({ message: "Invalid credentials." })
        const token = jwt.sign({ username: existingUser.username, id: existingUser._id }, SECRET_KEY)
        return res.send({ user: existingUser, token });
    } catch (error) {
        return res.send({ message: "something went wrong." })
    }
}

export const signup = async (req, res) => {
    const { username, lastname, firstname, email, password, confirmPassword } = req.body;
    try {
        const existingUser = await User.findOne({ username }, 'username');
        if (existingUser) return res.send({ message: 'User already exist with given username.' });
        if (password !== confirmPassword) return res.send({ message: "password don't match" });
        const newUser = await User.create({ username, name: `${firstname} ${lastname}`, email, password });
        const token = jwt.sign({ username: newUser.username, id: newUser._id }, SECRET_KEY)
        return res.send({ user: newUser, token });
    } catch (error) {
        return res.send({ message: "something went wrong." });
    }
}

export const findUser = async (req, res) => {
    const username = req.params.username;
    try {
        const user = await User.findOne({ username }).select({ password: false });
        return res.send(user);
    } catch (error) {
        console.log(username);
    }
}

export const updateProfile = async (req, res) => {
    const { id } = req.params;
    const { name, email, status, profilePicture } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, { name, email, status, profilePicture }, { new: true })
        res.send(user);
    } catch (error) {
        console.log(error);
    }
}


export const sendFollowRequest = async (req, res) => {
    const { user1, user2, isFollow } = req.body;
    try {
        if (isFollow) {
            // send notification and follow request
            const notice = { username: user1, message: `has requested to follow you` };
            await User.updateOne({ username: user2 }, { $push: { followRequest: user1, notification: notice } })
            await User.updateOne({ username: user1 }, { $push: { pendingRequest: user2 } })
            res.send({ message: "successed" })
        } else {
            await User.updateOne({ username: user1 }, { $pull: { following: user2 } })
            await User.updateOne({ username: user2 }, { $pull: { followers: user1 } })
            res.send({ message: 'successed' })
        }
    } catch (error) {
        res.send({ message: 'failed. Please try again.' })
    }
}

export const confirmFollowRequest = async (req, res) => {

    const { user1, user2, isFriend } = req.body;
    const newFriendChat = Chat({ user1, user2 });
    try {
        await User.updateOne({ username: user1.username }, { $push: { followers: user2.username } })
        await User.updateOne({ username: user2.username }, { $push: { following: user1.username } })

        await User.updateOne({ username: user1.username }, { $pull: { followRequest: user2.username } })
        await User.updateOne({ username: user2.username }, { $pull: { pendingRequest: user1.username } })

        if (!isFriend) {
            await newFriendChat.save();
            await User.updateOne({ username: user1.username }, { $push: { friends: newFriendChat._id } })
            await User.updateOne({ username: user2.username }, { $push: { friends: newFriendChat._id } })
        }
        res.send({ message: "successed" })
    } catch (error) {
        res.send({ message: 'failed. Please try again.' })
    }
}

export const cancelFollowRequest = async (req, res) => {
    const { user1, user2 } = req.body;
    try {
        await User.updateOne({ username: user1 }, { $pull: { pendingRequest: user2 } });
        await User.updateOne({ username: user2 }, { $pull: { followRequest: user1 } });
    } catch (error) {
        console.log(error);
    }
}