import User from '../models/user.js'
import jwt from 'jsonwebtoken'

export const signin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username }, 'username password name ProfilePicture');
        if (!existingUser) return res.status(400).json({ message: "User doesn't exist" })
        if (existingUser.password !== password) return res.status(404).json({ message: "Invalid credentials." })
        const token = jwt.sign({ username: existingUser.username, id: existingUser._id }, "secretKey")
        const result = { name: existingUser.name, username: existingUser.username, profilePicture: existingUser.profilePicture, _id: existingUser._id }
        console.log(result);
        return res.status(200).json({ result, token });
    } catch (error) {
        return res.status(500).json({ message: "something went wrong." })
    }
}

export const signup = async (req, res) => {
    const { username, lastname, firstname, email, password, confirmPassword } = req.body;
    try {
        const existingUser = await User.findOne({ username }, 'username');
        if (existingUser) return res.status(400).json({ message: 'User already exist with given username.' });
        if (password !== confirmPassword) return res.status(400).json({ message: "password don't match" });
        const newUser = await User.create({ username, name: `${firstname} ${lastname}`, email, password });
        const token = jwt.sign({ username: newUser.username, id: newUser._id }, "secretKey")
        const result = { name: newUser.name, username: newUser.username, profilePicture: newUser.profilePicture, _id: newUser._id }
        return res.status(200).json({ result, token });
    } catch (error) {
        return res.status(500).json({ message: "something went wrong." });
    }
}

export const findUser = async (req, res) => {
    const username = req.params.username;
    try {
        const user = await User.findOne({ username }).select({ password: false });
        return res.status(200).json(user);
    } catch (error) {
        console.log(username);
    }
}

export const updateProfile = async (req, res) => {
    const { id } = req.params;
    const { name, email, status, profilePicture } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, { name, email, status, profilePicture }, { new: true })
        res.status(200).json(user);
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

export const like = async (req, res) => {
    console.log(req.body);
}