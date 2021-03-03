import React, { useState } from 'react'
import { Paper, TextField, IconButton, Typography, Button, Avatar, Box, Grid, Badge, InputAdornment } from '@material-ui/core'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { useStyles } from './style';
import SendIcon from '@material-ui/icons/Send';
import ImageIcon from '@material-ui/icons/Image';


export const Inbox = () => {
    const classes = useStyles()
    const user = JSON.parse(localStorage.getItem('profile'))?.result;

    const [chatting, setChatting] = useState(false);

    if (chatting) {
        return (
            <div style={{ width: '100%' }}>
                <Paper elevation={3}>
                    <Box display="flex" justifyContent="flex-start">
                        <Box>
                            <Button onClick={() => setChatting(prev => !prev)}>
                                <KeyboardBackspaceIcon />
                            </Button>
                        </Box>
                        <Box>
                            <Typography variant='h6'>
                                Aditya...
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
                <div>
                    hey....
                </div>
            </div>
        )
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paper1} elevation={0} variant="outlined">
                        <Paper className={classes.paper2} style={{ justifyContent: 'center' }} elevation={0} variant="outlined">
                            <Typography >USERNAME</Typography>
                        </Paper>
                        <Button fullWidth style={{ justifyContent: 'flex-start', width: '100%', height: '50px' }}>
                            Mukesh
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Paper className={classes.paper1} elevation={0} variant="outlined">
                        <Paper className={classes.paper2} elevation={0} variant="outlined">
                            <Avatar alt="MUKESH" src="/static/images/avatar/1.jpg" style={{ margin: '12px' }} />
                            MUKESH
                        </Paper>
                        <Paper className={classes.chat} elevation={0} variant="outlined">
                            Chats
                        </Paper>
                        <Paper className={classes.send} elevation={0} variant="outlined">
                            <form className={classes.input} noValidate autoComplete="off" >
                                <TextField 
                                    fullWidth
                                    className={classes.margin}
                                    id="input-with-icon-textfield"
                                    size='medium'
                                    fontSize={52}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <IconButton aria-label="show 4 new mails" color="inherit">
                                                    <Badge color="secondary">
                                                        <ImageIcon style={{ fontSize: '35px' }} />
                                                    </Badge>
                                                </IconButton>
                                                <IconButton aria-label="show 4 new mails" color="inherit">
                                                    <Badge color="secondary">
                                                        <SendIcon style={{ fontSize: '35px' }} />
                                                    </Badge>
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </form>
                        </Paper>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}