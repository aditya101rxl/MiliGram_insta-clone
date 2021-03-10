import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import http from 'http'
import * as io from 'socket.io'

import userRoute from './routes/user.js';
import postRoute from './routes/post.js';
import inbox from './routes/inbox.js';
import { CONNECTION_URL } from './private.js';
import { socketController } from './controller/socket.js'

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use('/user', userRoute);
app.use('/post', postRoute);
app.use('/inbox', inbox);

const server = http.createServer(app);
const socketio = new io.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

socketio.on("connection", (socket) => {
    socketController({ socket, io: socketio })
});

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { server.listen(PORT, () => console.log(`socket server is running on port : ${PORT}`)) })
    .catch(err => console.log(err.message))

mongoose.set("useFindAndModify", false);
