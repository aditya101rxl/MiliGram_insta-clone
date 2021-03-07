import User from '../models/user.js'
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


export const follow = async (req, res) => {
    const { username1, username2, isFollow } = req.body;
    if (isFollow) {
        try {
            await User.updateOne({ username: username1 }, { $push: { following: username2 } })
            await User.updateOne({ username: username2 }, { $push: { followers: username1 } })
            res.send({ message: "successed" })
        } catch (error) {
            res.send({ message: 'failed. Please try again.' })
        }
    } else {
        try {
            await User.updateOne({ username: username1 }, { $pull: { following: username2 } })
            await User.updateOne({ username: username2 }, { $pull: { followers: username1 } })
            res.send({ message: 'successed' })
        } catch (error) {
            res.send({ message: 'failed. Please try again.' })
        }
    }
}
