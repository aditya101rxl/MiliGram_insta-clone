import React, { Component } from "react";
import { Avatar } from "../chatList/Avatar";

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
                    <span>Seen</span>
                </div>
            </div>
            <Avatar isOnline="active" image={image} />
        </div>
    );
}