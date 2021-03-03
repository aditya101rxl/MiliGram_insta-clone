import React from 'react'
import { Paper, Avatar, Typography, Button } from '@material-ui/core'
import { useStyles } from './style'

export const UserList = ({ user }) => {
    const classes = useStyles()

    const handleClick = (e) => {
        console.log(e.currentTarget);
    }

    return (
        <Button fullWidth variant='text' onFocus>
            <Paper variant='outlined' className={classes.paper2} onClick={handleClick}>
                <Avatar style={{ margin: '11px' }} className={classes.large} alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                <Paper elevation={0}>
                    <Typography variant='h5'>{user}</Typography>
                    <Typography variant='subtitle2'>last seen: {user}</Typography>
                </Paper>
            </Paper>
        </Button>
    )
}

