// const io = require('socket.io')(5000)

// io.on('connection', socket => {
//     console.log('okay.');
// })



// export const send = async (req, res) => {
//     console.log('sending...');
// }

// export const recieve = async (req, res) => {
//     console.log('recieving..');
// }

import Chat from '../models/chat.js'

export const chatlist = async (req, res) => {
    const { chatlist } = req.body;
    let list = []
    chatlist.forEach(element => {
        list.push({ _id: element });
    });
    try {
        const data = await Chat.find({ $or: list })
        res.send(data);
    } catch (error) {
        console.log(error);
    }
}

export const sendMsg = async (req, res) => {
    const { _id, msg } = req.body;
    await Chat.updateOne({ _id }, { $push: { message: msg } });
}
