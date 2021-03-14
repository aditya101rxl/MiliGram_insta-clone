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
import { GlobalContext } from '../../../context/global/GlobalStates';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import SendIcon from '@material-ui/icons/Send';
import { Follow } from '../Follow'


export const Profile = () => {
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()
    const params = useParams()
    const username = params.username;

    const [userFound, setUserFound] = useState(0);
    const [edit, setEdit] = useState(false);
    const [userPosts, setUserPosts] = useState([]);
    const { user, posts } = useContext(GlobalContext)

    useEffect(async () => {
        const { data } = await api.findUser(username);
        setUserFound(data);
    }, [location])

    useEffect(() => {
        var userposts = [];
        for (let index = 0; index < posts.length; index++) {
            const post = posts[index];
            if (post?.username === userFound?.username) {
                userposts.push(post);
            }
        }
        setUserPosts([...userposts]);
    }, [userFound, posts])

    const handleCreatePost = () => history.push('/post/createPost');
    const handleEdit = () => setEdit(prev => !prev)

    if (userFound === 0) {
        return (
            <LinearProgress color="secondary" />
        )
    }

    if (edit) {
        return (
            <EditProfile user={user} setEdit={setEdit} history={history} />
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
                                            <Typography variant='h6'>{userPosts.length}</Typography>
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
                                    {(user !== null) && (userFound?._id) != (user?._id) &&
                                        <Follow
                                            username={userFound?.username}
                                            profilePicture={userFound?.profilePicture}
                                        />
                                    }
                                    {(userFound?._id) === (user?._id) && (
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            color='primary'
                                            onClick={handleCreatePost}
                                            className={classes.margin}>
                                            Create New Post &nbsp; &nbsp;
                                            <AddAPhotoIcon />
                                        </Button>
                                    )}
                                    {((user !== null) && ((user?.followers.indexOf(userFound?.username) !== -1) ||
                                        (user?.following.indexOf(userFound?.username) !== -1))) && (
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                color='primary'
                                                onClick={() => history.push('/user/inbox')}
                                                className={classes.margin}>
                                                Message &nbsp; &nbsp;
                                                <SendIcon />
                                            </Button>
                                        )}
                                </div>
                            </Grid>
                        </Grid>
                        <div className={classes.root1}>
                            {userPosts.length === 0 && (<Typography variant='overline' style={{ margin: '35%' }}>No Posts</Typography>)}
                            <GridList cellHeight={250} cols={3}>
                                {userPosts.map((tile) => (
                                    <GridListTile key={tile.img}>
                                        <img style={{ display: 'block', margin: '0 auto', width: '100%' }} src={tile.file} />
                                        <GridListTileBar
                                            title={tile.message}
                                            subtitle={<span>likes: {tile.likes.length} comments: {tile.comments.length}</span>}
                                            actionIcon={
                                                <IconButton onClick={() => history.push(`/post/postView/${tile._id}`)} aria-label={`info about ${tile.username}`} className={classes.icon}>
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

