import React, { useContext } from "react";
import { ChatContext } from "../../../context/local/ChatStates";
import { Avatar } from "./Avatar";
import { Typography } from '@material-ui/core'

export const ChatListItems = ({ id, name, animationDelay, active, isOnline, image, setSelected }) => {

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
        const userInfo = { _id: id, username: name, profilePicture: image, isOnline: isOnline };
        selectChat(userInfo)
        setSelected(true);
    };

    return (
        <div
            style={{ animationDelay: `0.${animationDelay}s` }}
            onClick={select}
            className={`chatlist__item ${active ? active : ""}`}
        >
            <Avatar
                image={image ? image : "http://placehold.it/80x80"}
                isOnline={isOnline}
            />

            <div className="userMeta">
                <p>{name}</p>
                <Typography variant='subtitle2' style={{ margin: '-7px 0', color: `${isOnline ? '#1dc51d' : 'grey'}` }}>
                    {isOnline ? "online" : "last seen will update soon"}
                </Typography>
            </div>
        </div>
    );
}