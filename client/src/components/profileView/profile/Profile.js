import React, { useEffect, useState } from 'react'
import { Paper, GridList, GridListTile, GridListTileBar, Typography, Button, Grid, IconButton } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import * as api from '../../../api'
import { useStyles } from './style';
import { Link, useHistory, useParams, useLocation } from 'react-router-dom'
import LinearProgress from '@material-ui/core/LinearProgress';
import { EditProfile } from '../edit/EditProfile';


export const Profile = () => {
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()
    const params = useParams()
    const username = params.username;

    const [user, setUser] = useState(0);
    const [edit, setEdit] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const existingUser = JSON.parse(localStorage.getItem('profile'))?.result;

    useEffect(async () => {
        try {
            const { data } = await api.findUser(username);
            setUser(data);
        } catch (error) {
            console.log(error);
        }
    }, [isFollowing, location])


    const handleFollow = async () => {
        const { data } = await api.follow({ username1: existingUser?.username, username2: user?.username, isFollow: true })
        if (data.message === 'successed') { setIsFollowing(prev => !prev); }
    }
    const handleUnfollow = async () => {
        const { data } = await api.follow({ username1: existingUser?.username, username2: user?.username, isFollow: false });
        if (data.message === 'successed') { setIsFollowing(prev => !prev); }
    }

    const handleCreatePost = () => history.push('/post/createPost');
    const handleEdit = () => setEdit(prev => !prev)


    const Follow = () => {
        console.log('redendering..');
        return user.followers.find(username => (isFollowing || username === existingUser?.username)) ? (
            <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={handleUnfollow}
                className={classes.margin}>
                Unfollow
            </Button>
        ) : (
                <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    onClick={handleFollow}
                    className={classes.margin}>
                    Follow
                </Button>
            )
    }


    if (user === 0) {
        return (
            <LinearProgress color="secondary" />
        )
    }

    if (edit) {
        return (
            <EditProfile user={user} setUser={setUser} setEdit={setEdit} />
        )
    }

    return (
        <Paper className={classes.paper} style={{ maxWidth: "auto", margin: "0 auto" }}>
            <Typography style={{ margin: "0 auto" }} variant='overline'>Profile</Typography>
            {
                user ? (
                    <div className={classes.root}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={4}>
                                <div className={classes.header}>
                                    <img className={classes.image} src={user?.profilePicture} alt={user?.name} />
                                    <Button
                                        disabled={(user._id) !== (JSON.parse(localStorage.getItem('profile'))?.result?._id)}
                                        variant="outlined"
                                        color="secondary"
                                        fullWidth
                                        onClick={handleEdit}
                                        className={classes.margin}>
                                        <EditIcon /> &nbsp;Edit Profile
                                    </Button>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <div className={classes.header}>
                                    <Typography variant='h6'>{user.name} - (username : {user.username})</Typography>
                                    <Typography color='secondary' variant='overline'>status: {user.status}</Typography>
                                </div>
                                <Grid container spacing={1}>
                                    <Grid item xs>
                                        <div className={classes.header}>
                                            <Typography variant='h6'>{user.posts.length}</Typography>
                                            <Typography variant='overline'>posts</Typography>
                                        </div>
                                    </Grid>
                                    <Grid item xs>
                                        <div className={classes.header}>
                                            <Typography variant='h6'>{user.followers.length}</Typography>
                                            <Typography variant='overline'>followers</Typography>
                                        </div>
                                    </Grid>
                                    <Grid item xs>
                                        <div className={classes.header}>
                                            <Typography variant='h6'>{user.following.length}</Typography>
                                            <Typography variant='overline'>following</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                                <div className={classes.header}>
                                    {existingUser && (user?._id) !== (existingUser?._id) ? <Follow /> : (
                                        <Button
                                            fullWidth
                                            disabled
                                            variant="outlined"
                                            color="secondary"
                                            className={classes.margin}>
                                            Follow
                                        </Button>
                                    )}
                                    <Button
                                        fullWidth
                                        disabled={(user._id) !== (existingUser?._id)}
                                        variant="outlined"
                                        color='primary'
                                        onClick={handleCreatePost}
                                        className={classes.margin}>
                                        Create New Post
                                    </Button>
                                </div>

                            </Grid>
                        </Grid>
                        <div className={classes.root1}>
                            {user.posts.length === 0 && (<Typography variant='overline' style={{ margin: '35%' }}>No Posts</Typography>)}
                            <GridList cellHeight={600} >
                                {user.posts.map((tile) => (
                                    <GridListTile key={tile._id}>
                                        <img src={tile.file} alt={tile.username} />
                                        <GridListTileBar
                                            title={tile.message}
                                            subtitle={<span>by: {tile.createdAt}</span>}
                                            actionIcon={
                                                <IconButton aria-label={`info about ${tile.username}`} className={classes.icon}>
                                                    <InfoIcon />
                                                </IconButton>
                                            }
                                        />
                                    </GridListTile>
                                ))}
                            </GridList>
                        </div>
                    </div>
                ) : (
                        <Paper className={classes.paper}>
                            <ErrorOutlineIcon style={{ fontSize: 80 }} />
                            <Typography variant='h4'>No User found with given username: {username}</Typography>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="open drawer"
                                component={Link}
                                to='/'
                            >
                                <HomeIcon style={{ fontSize: 40 }} />
                            </IconButton>
                        </Paper>
                    )
            }
        </Paper >
    )
}

