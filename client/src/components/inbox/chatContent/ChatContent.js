import React, { useRef, useState, useEffect, useContext } from "react";
import SendIcon from '@material-ui/icons/Send';
import ImageIcon from '@material-ui/icons/Image';
import SettingsIcon from '@material-ui/icons/Settings';
import * as api from '../../../api'

import "./chatContent.css";
import { Avatar } from "../chatList/Avatar";
import { ChatItem } from "./ChatItem";
import { ChatContext } from "../../../context/local/ChatStates";
import { GlobalContext } from "../../../context/global/GlobalStates";

export const ChatContent = () => {

    const messagesEndRef = useRef(null);
    const { activeChat} = useContext(ChatContext);
    const { user, socket } = useContext(GlobalContext)
    const [msg, setMsg] = useState("");
    const user1 = activeChat?.user1?.username === user?.username ? activeChat?.user1 : activeChat?.user2;
    const user2 = activeChat?.user1?.username === user1?.username ? activeChat?.user2 : activeChat?.user1;
    const [allMsg, setAllMsg] = useState([]);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    const getTime = () => {
        var today = new Date();
        var time = today.getHours() + ':' + today.getMinutes()
        return time;
    }
    useEffect(() => {
        if (messagesEndRef.current != null)
            scrollToBottom();
    }, [allMsg])
    useEffect(() => {
        if (activeChat !== null)
            setAllMsg(activeChat?.message);
    }, [activeChat])

    const addMsg = (msg) => {
        setAllMsg([...allMsg, msg]);
    }

    useEffect(() => {
        if (socket == null) return;
        socket.on('receive', ({ msg }) => {
            addMsg(msg);
        })
    }, [socket, allMsg])

    const handleSendMsgClick = (e) => {
        if (msg != "") {
            const stringifiedMsg = JSON.stringify({ user: user1.username, msg: { m: msg, time: getTime() } })
            // api call
            api.sendMsg({ _id: activeChat?._id, msg: stringifiedMsg });
            socket.emit('send', { to: user2.username, msg: stringifiedMsg })
            addMsg(stringifiedMsg);
            setMsg("");
        }
    }

    const handleSendMsg = (e) => {
        if (e.charCode === 13 && msg != "") {
            const stringifiedMsg = JSON.stringify({ user: user1.username, msg: { m: msg, time: getTime() } })
            // api call
            api.sendMsg({ _id: activeChat?._id, msg: stringifiedMsg });
            socket.emit('send', { to: user2.username, msg: stringifiedMsg })
            addMsg(stringifiedMsg);
            setMsg("");
        }
    }

    const handleEmoji = (e) => {
        console.log('handle emoji click');
    }

    if (activeChat == null) {
        return (
            <div>
                Please select any one to chat
            </div>
        )
    }

    return (
        <div className="main__chatcontent">
            <div className="content__header">
                <div className="blocks">
                    <div className="current-chatting-user">
                        <Avatar
                            isOnline="active"
                            image={user2.profilePicture}
                        />
                        <p>{user2.username}</p>
                    </div>
                </div>

                <div className="blocks">
                    <div className="settings">
                        <button className="btn-nobg">
                            <SettingsIcon />
                        </button>
                    </div>
                </div>
            </div>
            <div className="content__body">
                <div className="chat__items">
                    {allMsg.map((itm, index) => {
                        const item = JSON.parse(itm);
                        return (
                            <ChatItem
                                animationDelay={index + 1}
                                key={index + 1}
                                user={item.user === user1.username ? "me" : "other"}
                                msg={item.msg}
                                image={item.user === user1.username ? user1.profilePicture : user2.profilePicture}
                            />
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className="content__footer">
                <div className="sendNewMessage">
                    <button className="addFiles" onClick={handleEmoji}>
                        <ImageIcon />
                    </button>
                    <input
                        autoFocus
                        type="text"
                        placeholder="Type a message here"
                        onChange={(e) => setMsg(e.target.value)}
                        value={msg}
                        onKeyPress={handleSendMsg}
                    />
                    <button className="btnSendMsg" id="sendMsgBtn" onClick={handleSendMsgClick}>
                        <SendIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}