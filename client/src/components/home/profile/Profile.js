import React from 'react'
import { Paper, Avatar, Typography, Button, Grid } from '@material-ui/core'
import { useStyles } from './style';
import { Link, useHistory } from 'react-router-dom'


export const Profile = () => {
    const classes = useStyles()
    const history = useHistory()
    const user = JSON.parse(localStorage.getItem('profile'))?.result;

    const logout = () => {
        localStorage.clear();
        window.location.reload()
    }

    const handleProfileView = () => history.push(`/user/profile/${user.username}`);
    const handleCreatePost = () => history.push('/post/createPost');

    return (
        <Paper elevation={0} variant='outlined' className={classes.paper}>
            <Typography variant='h6'>Profile</Typography>
            {
                user ? (
                    <>
                        <Avatar alt={user?.name} src={user?.profilePicture} className={classes.avatar} ><Typography variant='h3'>{user?.name.charAt(0)}</Typography></Avatar>
                        <Typography variant='h5'>{user?.name}</Typography>
                        <Typography variant='subtitle2' >{user?.username}</Typography>
                        <Grid container spacing={1}>
                            <Grid item sm={12}>
                                <Button fullWidth variant='contained' color='primary' onClick={handleCreatePost}>Create New Post</Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button fullWidth variant='outlined' color='primary' onClick={handleProfileView}>Profile</Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button fullWidth variant='outlined' color='secondary' onClick={logout}>Logout</Button>
                            </Grid>
                        </Grid>
                    </>
                ) : (
                        <>
                            <Typography variant='overline'>Login to see Your Profile</Typography>
                            <Button component={Link} to="/user/auth" variant='outlined' color='primary' >Sing In</Button>
                        </>
                    )
            }
        </Paper>
    )
}

