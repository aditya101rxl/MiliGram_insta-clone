import React, { useContext } from "react";
import { ChatContext } from "../../../context/local/ChatStates";
import { Avatar } from "./Avatar";

export const ChatListItems = ({ id, name, animationDelay, active, isOnline, image }) => {

    const { selectChat } = useContext(ChatContext);

    const select = (e) => {
        for (
            let index = 0;
            index < e.currentTarget.parentNode.children.length;
            index++
        ) {
            e.currentTarget.parentNode.children[index].classList.remove("active");
        }
        e.currentTarget.classList.add("active");
        selectChat(id)
    };

    return (
        <div
            style={{ animationDelay: `0.${animationDelay}s` }}
            onClick={select}
            className={`chatlist__item ${active ? active : ""}`}>
            <Avatar
                image={image ? image : "http://placehold.it/80x80"}
                isOnline={isOnline}
            />

            <div className="userMeta">
                <p>{name}</p>
                <span className="activeTime">7 mins ago</span>
            </div>
        </div>
    );
}