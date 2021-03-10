import React, { useContext } from "react";
import "./chatList.css";
import { ChatListItems } from "./ChatListItems";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SearchIcon from '@material-ui/icons/Search';
import { GlobalContext } from "../../../context/global/GlobalStates";
import { ChatContext } from "../../../context/local/ChatStates";

export const ChatList = () => {

    const { user } = useContext(GlobalContext);
    const { chatList } = useContext(ChatContext);

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
                            name={
                                item?.user1?.username == user?.username ?
                                    item?.user2.username :
                                    item?.user1.username
                            }
                            id={item?._id}
                            key={item?._id}
                            animationDelay={index + 0.5}
                            active={false ? "active" : ""}
                            isOnline={true ? "active" : ""}
                            image={
                                item?.user1?.username == user?.username ?
                                    item?.user2?.profilePicture :
                                    item?.user1?.profilePicture
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
}