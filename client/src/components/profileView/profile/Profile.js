import React, { useContext, useEffect, useState } from 'react'
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
import { Navbar } from '../../navbar/Navbar';
import { GlobalContext } from '../../../context/global/GlobalStates';


export const Profile = () => {
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()
    const params = useParams()
    const username = params.username;

    const [userFound, setUserFound] = useState(0);
    const [edit, setEdit] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const { user } = useContext(GlobalContext)

    useEffect(async () => {
        const { data } = await api.findUser(username);
        setUserFound(data);
    }, [isFollowing, location, user])


    const handleFollow = async () => {
        const { data } = await api.follow({ username1: user?.username, username2: userFound?.username, isFollow: true })
        if (data.message === 'successed') { setIsFollowing(prev => !prev); }
    }
    const handleUnfollow = async () => {
        const { data } = await api.follow({ username1: user?.username, username2: userFound?.username, isFollow: false });
        if (data.message === 'successed') { setIsFollowing(prev => !prev); }
    }

    const handleCreatePost = () => history.push('/post/createPost');
    const handleEdit = () => setEdit(prev => !prev)


    const Follow = () => {
        console.log('redendering..');
        return userFound.followers.find(username => (isFollowing || username === user?.username)) ? (
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


    if (userFound === 0) {
        return (
            <LinearProgress color="secondary" />

        )
    }

    if (edit) {
        return (
            <EditProfile user={user} setEdit={setEdit} />
        )
    }

    return (
        <Paper className={classes.paper} style={{ maxWidth: "auto", margin: "0 auto" }}>
            <Typography style={{ margin: "0 auto" }} variant='overline'>Profile</Typography>
            {
                userFound ? (
                    <div className={classes.root}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={4}>
                                <div className={classes.header}>
                                    <img className={classes.image} src={userFound?.profilePicture} alt={userFound?.name} />
                                    <Button
                                        disabled={(userFound?._id) !== (user?._id)}
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
                                    <Typography variant='h6'>{userFound.name} - (username : {userFound.username})</Typography>
                                    <Typography color='secondary' variant='overline'>status: {userFound.status}</Typography>
                                </div>
                                <Grid container spacing={1}>
                                    <Grid item xs>
                                        <div className={classes.header}>
                                            <Typography variant='h6'>{userFound.posts.length}</Typography>
                                            <Typography variant='overline'>posts</Typography>
                                        </div>
                                    </Grid>
                                    <Grid item xs>
                                        <div className={classes.header}>
                                            <Typography variant='h6'>{userFound.followers.length}</Typography>
                                            <Typography variant='overline'>followers</Typography>
                                        </div>
                                    </Grid>
                                    <Grid item xs>
                                        <div className={classes.header}>
                                            <Typography variant='h6'>{userFound.following.length}</Typography>
                                            <Typography variant='overline'>following</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                                <div className={classes.header}>
                                    {user && (userFound?._id) !== (user?._id) ? <Follow /> : (
                                        <Button
                                            fullWidth
                                            disabled
                                            variant="outlined"
                                            color="secondary"
                                            className={classes.margin}>
                                            Follow
                                        </Button>
                                    )}
                                    {(userFound._id) === (user?._id) ? (
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            color='primary'
                                            onClick={handleCreatePost}
                                            className={classes.margin}>
                                            Create New Post
                                        </Button>
                                    ) : (
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            color='primary'
                                            onClick={() => history.push('/user/inbox')}
                                            className={classes.margin}>
                                            Message
                                        </Button>
                                    )}
                                </div>

                            </Grid>
                        </Grid>
                        <div className={classes.root1}>
                            {userFound.posts.length === 0 && (<Typography variant='overline' style={{ margin: '35%' }}>No Posts</Typography>)}
                            <GridList cellHeight={600} >
                                {userFound.posts.map((tile) => (
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

