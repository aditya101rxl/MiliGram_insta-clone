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
    const allChatUsers = [
        {
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
            id: 1,
            name: "Tim Hover",
            active: true,
            isOnline: true,
        },
        {
            image:
                "https://pbs.twimg.com/profile_images/1055263632861343745/vIqzOHXj.jpg",
            id: 2,
            name: "Ayub Rossi",
            active: false,
            isOnline: false,
        },
        {
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU",
            id: 3,
            name: "Hamaad Dejesus",
            active: false,
            isOnline: false,
        },
        {
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZ6tM7Nj72bWjr_8IQ37Apr2lJup_pxX_uZA&usqp=CAU",
            id: 4,
            name: "Eleni Hobbs",
            active: false,
            isOnline: true,
        },
        {
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJo1MiPQp3IIdp54vvRDXlhbqlhXW9v1v6kw&usqp=CAU",
            id: 5,
            name: "Elsa Black",
            active: false,
            isOnline: false,
        },
        {
            image:
                "https://huber.ghostpool.com/wp-content/uploads/avatars/3/596dfc2058143-bpfull.png",
            id: 6,
            name: "Kayley Mellor",
            active: false,
            isOnline: true,
        },
        {
            image:
                "https://www.paintingcontest.org/components/com_djclassifieds/assets/images/default_profile.png",
            id: 7,
            name: "Hasan Mcculloch",
            active: false,
            isOnline: true,
        },
        {
            image:
                "https://auraqatar.com/projects/Anakalabel/media//vesbrand/designer4.jpg",
            id: 8,
            name: "Autumn Mckee",
            active: false,
            isOnline: false,
        },
        {
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSM6p4C6imkewkCDW-9QrpV-MMAhOC7GnJcIQ&usqp=CAU",
            id: 9,
            name: "Allen Woodley",
            active: false,
            isOnline: true,
        },
        {
            image: "https://pbs.twimg.com/profile_images/770394499/female.png",
            id: 10,
            name: "Manpreet David",
            active: false,
            isOnline: true,
        },
    ];
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