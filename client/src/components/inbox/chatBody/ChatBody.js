import React, { useContext, useEffect } from "react";
import { Paper, Typography } from '@material-ui/core'
import { ChatList } from "../chatList/ChatList";
import ChatContent from "../chatContent/ChatContent";
import UserProfile from "../userProfile/UserProfile";
import { GlobalContext } from "../../../context/global/GlobalStates";
import "./chatBody.css";
import { ChatProvider } from "../../../context/local/ChatStates";


export const ChatBody = () => {

    const { user } = useContext(GlobalContext)


    if (user == null) {
        return (
            <Paper className='paper'>
                <Typography variant='h6' align='center'>
                    Please login to chat with your friends
                </Typography>
            </Paper>
        )
    }

    return (
        <div className="main__chatbody">
            <ChatProvider>
                <ChatList />
                <ChatContent />
                {/* <UserProfile /> */}
            </ChatProvider>
        </div>
    );
}