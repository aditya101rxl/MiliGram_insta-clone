import Chat from '../models/chat.js'
import { activeUser } from './socket.js'

export const chatlist = async (req, res) => {
    const { chatlist, user } = req.body;
    // console.log(chatlist, user);
    let list = []
    chatlist.forEach(element => {
        list.push({ _id: element });
    });
    try {
        const data = await Chat.find({ $or: list }).select({ message: false })
        let newData = [];
        data.forEach(ele => {
            if (ele.user1.username === user) {
                newData.push({ friend: ele.user2, msgUpdate: ele.msgUpdate, _id: ele._id, active: activeUser[ele.user2.username] !== undefined })
            } else {
                newData.push({ friend: ele.user1, msgUpdate: ele.msgUpdate, _id: ele._id, active: activeUser[ele.user1.username] !== undefined })
            }
        })
        res.send(newData);
    } catch (error) {
        console.log(error);
    }
}

export const getChatMsg = async (req, res) => {
    const { _id } = req.params;
    // console.log(_id);
    const data = await Chat.findById(_id).select({ message: true });
    res.send(data);
}

export const sendMsg = async (req, res) => {
    const { _id, newMsg } = req.body;
    await Chat.updateOne({ _id }, { $push: { message: newMsg } });
}
