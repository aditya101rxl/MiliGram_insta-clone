import React, { useContext } from "react";
import "./chatList.css";
import { ChatListItems } from "./ChatListItems";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SearchIcon from '@material-ui/icons/Search';
import { GlobalContext } from "../../../context/global/GlobalStates";
import { ChatContext } from "../../../context/local/ChatStates";
import { CircularProgress } from "@material-ui/core";

export const ChatList = ({ setSelected }) => {

    const { user } = useContext(GlobalContext);
    const { chatList } = useContext(ChatContext);

    console.log('chatlist rendering...');
    if (chatList === null) {
        return (
            <div>
                <CircularProgress />
            </div>
        )
    }

    return (
        <div className="main__chatlist" >
            <div className="chatlist__heading">
                <h2>Chats</h2>
                <button className="btn">
                    <AddBoxIcon fontSize='large' />
                </button>
                <button className="btn-nobg">
                    <MoreHorizIcon fontSize='large' color='secondary' />
                </button>
            </div>
            <div className="chatList__search">
                <div className="search_wrap">
                    <input type="text" placeholder="Search Here" required />
                    <button className="search-btn">
                        <SearchIcon />
                    </button>
                </div>
            </div>
            <div className="chatlist__items">
                {/* {allChatUsers.map((item, index) => { */}
                {chatList.map((item, index) => {
                    return (
                        <ChatListItems
                            name={item?.friend?.username}
                            id={item?._id}
                            key={item?._id}
                            animationDelay={index + 0.5}
                            active={false ? "active" : ""}
                            isOnline={item.active ? "active" : ""}
                            image={item?.friend?.profilePicture}
                            setSelected={setSelected}
                        />
                    );
                })}
            </div>
        </div>
    );
}