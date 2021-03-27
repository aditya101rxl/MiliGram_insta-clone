import React, { useRef, useState, useEffect, useContext } from "react";
import SendIcon from '@material-ui/icons/Send';
import ImageIcon from '@material-ui/icons/Image';
import SettingsIcon from '@material-ui/icons/Settings';
import * as api from '../../../api'
import TelegramIcon from '@material-ui/icons/Telegram';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import "./chatContent.css";
import { Avatar } from "../chatList/Avatar";
import { ChatItem } from "./ChatItem";
import { ChatContext } from "../../../context/local/ChatStates";
import { GlobalContext } from "../../../context/global/GlobalStates";
import { IconButton, Typography } from "@material-ui/core";

export const ChatContent = ({ setSelected }) => {

    const messagesEndRef = useRef(null);
    const { activeChat, clearActiveChat, userInfo } = useContext(ChatContext);
    const { user, socket } = useContext(GlobalContext)
    const msg = useRef("")
    const [allMsg, setAllMsg] = useState([]);

    console.log(allMsg);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    const getTime = () => {
        var today = new Date();
        var time = today.getHours() + ':' + today.getMinutes()
        return time;
    }
    useEffect(() => {
        if (activeChat !== null)
            setAllMsg(activeChat?.message);
    }, [activeChat])
    useEffect(() => {
        console.log('mounted');
        socket.on('receive', ({ newMsg }) => {
            addMsg(newMsg);
        })
        if (messagesEndRef.current != null)
            scrollToBottom();
        return () => {
            console.log('unmounted');
        }
    }, [allMsg])
    const addMsg = (newMsg) => { setAllMsg([...allMsg, newMsg]); }
    const handleSendMsgClick = () => {
        if (msg.current.value != "") {
            const stringifiedMsg = JSON.stringify({ user: user.username, msg: { m: msg.current.value, time: getTime() } })
            // api call
            api.sendMsg({ _id: activeChat?._id, newMsg: stringifiedMsg });
            socket.emit('send', { to: userInfo.username, newMsg: stringifiedMsg })
            addMsg(stringifiedMsg);
            msg.current.value = "";
        }
    }
    const handleSendMsg = (e) => { if (e.charCode === 13) { handleSendMsgClick() } }
    const handleEmoji = (e) => { console.log('handle emoji click'); }
    const handleChangeActive = () => {
        clearActiveChat();
        setSelected(false);
    }
    if (activeChat == null) {
        return (
            <div style={{ marginLeft: '30%', marginTop: '35%' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <TelegramIcon />
                    <Typography>
                        Please select any one to chat
                </Typography>
                </div>
            </div>
        )
    }

    return (
        <div className="main__chatcontent">
            <div className="content__header">
                <div className="blocks">
                    <div className="current-chatting-user">
                        <IconButton onClick={handleChangeActive}>
                            <ArrowBackIosIcon />
                        </IconButton>
                        <Avatar
                            isOnline={userInfo.isOnline ? "active" : ""}
                            image={userInfo.profilePicture}
                        />
                        <div>
                            <p>{userInfo.username}</p>
                            <Typography variant='subtitle2' style={{ margin: '-7px 0', color: `${userInfo.isOnline ? '#1dc51d' : 'grey'}` }}>
                                {userInfo.isOnline ? "online" : "last seen will update soon"}
                            </Typography>
                        </div>
                    </div>
                </div>

                <div className="blocks">
                    <div className="settings">
                        <IconButton>
                            <SettingsIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
            <div className="content__body">
                <Typography variant='inherit' style={{ display: 'flex', justifyContent: 'center' }}>your conversations with {userInfo.username}</Typography>
                <div className="chat__items">
                    {allMsg.map((itm, index) => {
                        const item = JSON.parse(itm);
                        return (
                            <ChatItem
                                animationDelay={index + 1}
                                key={index + 1}
                                user={item.user === user.username ? "me" : "other"}
                                msg={item.msg}
                            // image={item.user === user1.username ? user1.profilePicture : user2.profilePicture}
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
                        ref={msg}
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