import React from "react";
import DoneIcon from '@material-ui/icons/Done';

export const ChatItem = ({ user, msg, image }) => {

    return (
        <div
            style={{ animationDelay: `0.5s` }}
            className={`chat__item ${user === "other" ? "other" : ""}`}
        >
            <div className="chat__item__content">
                <div className="chat__msg">{msg.m}</div>
                <div className="chat__meta">
                    <span>{msg.time}</span>
                    <span><DoneIcon style={{ fontSize: '1rem' }} /></span>
                </div>
            </div>
            {/* <Avatar isOnline="active" image={image} /> */}
        </div>
    );
}