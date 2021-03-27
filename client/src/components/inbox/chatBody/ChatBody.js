import React, { useContext, useEffect, useState } from "react";
import { Button, Paper, Typography, Grid } from '@material-ui/core'
import { ChatList } from "../chatList/ChatList";
import { ChatContent } from "../chatContent/ChatContent";
import UserProfile from "../userProfile/UserProfile";
import { GlobalContext } from "../../../context/global/GlobalStates";
import "./chatBody.css";
import { makeStyles } from '@material-ui/core/styles';
import { ChatContext, ChatProvider } from "../../../context/local/ChatStates";


const useStyles = makeStyles((theme) => ({
    sectionMobile: {
        display: 'flex',
        maxWidth: '100%',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    sectionDesktop: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
}));

export const ChatBody = () => {
    document.title = 'inbox'
    const { user } = useContext(GlobalContext)
    const [selected, setSelected] = useState(false);
    const classes = useStyles();

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
        <ChatProvider>
            <div className="main__chatbody" className={classes.sectionMobile}>
                {!selected ? (
                    <ChatList setSelected={setSelected} />
                ) : (
                    <ChatContent setSelected={setSelected} />
                )}
            </div>
            {/* <div className={classes.sectionDesktop}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={4}>
                        <ChatList setSelected={setSelected} />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <ChatContent setSelected={setSelected} />
                    </Grid>
                </Grid>
            </div> */}
        </ChatProvider >
    );
}