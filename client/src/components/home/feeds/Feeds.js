import React, { useEffect, useState, useContext } from 'react';
import * as api from '../../../api'

import clsx from 'clsx';
import { Paper, Card, CardHeader, CardMedia, CardContent, CardActions, TextField, InputBase } from '@material-ui/core'
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import { useStyles } from './style'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { GlobalContext } from '../../../context/global/GlobalStates';

export const Feeds = ({ post }) => {
    const classes = useStyles();
    const history = useHistory();
    const { like, dislike } = useContext(GlobalContext)
    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const user = JSON.parse(localStorage.getItem('profile'))?.result?.username
    const isLogin = user === undefined

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    const handleLike = async () => {
        post.likes.push(user);
        like({ data: post.likes, id: post._id, user });
    }

    const handleDislike = async () => {
        post.likes = post.likes.filter(u => u == user);
        dislike({ data: post.likes, id: post._id, user });
    }

    const Like = () => {
        if (post.likes.length > 0) {
            return post.likes.find(like => like === user) ? (
                <FavoriteIcon onClick={handleDislike} color='secondary' fontSize='large' />
            ) : (
                <FavoriteBorderIcon onClick={handleLike} fontSize='large' />
            )
        }
        return <FavoriteBorderIcon onClick={handleLike} fontSize='large' />
    }

    return (
        <Card className={classes.root} variant='outlined'>
            <CardHeader
                style={{ padding: '1px' }}
                avatar={
                    <IconButton aria-label="show 4 new mails" color="inherit" onClick={() => history.push(`/user/profile/${post.username}`)}>
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {post.name.charAt(0)}
                        </Avatar>
                    </IconButton>
                }
                action={
                    <>
                        <IconButton disabled={isLogin} aria-label="settings" onClick={handleClickOpen}>
                            <MoreHorizIcon style={{ marginRight: '22px', marginTop: '12px', }} />
                        </IconButton>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <Paper className={classes.dialog_paper}>
                                <Button style={{ padding: '10px', fontWeight: '600' }} color='secondary'>Report</Button>
                                <Button style={{ padding: '10px', fontWeight: '600' }} variant='outlined' color='secondary'>Follow / Unfollow</Button>
                                <Button style={{ padding: '10px' }} variant='outlined'>Go To Post</Button>
                                <Button style={{ padding: '10px' }} variant='outlined'>Share</Button>
                                <Button style={{ padding: '10px' }} variant='outlined'>Copy link</Button>
                                <Button style={{ padding: '10px' }} variant='outlined' onClick={handleClose}>Cancel</Button>
                            </Paper>
                        </Dialog>
                    </>
                }
                title={<Typography className={classes.user_dialog} variant='h6'>{post.username}</Typography>}
                subheader={post.createdAt}
            />
            <div className={classes.line} />
            <CardMedia
                className={classes.media}
                image={post.file}
                title="image"
            />
            <CardActions disableSpacing>
                <IconButton disabled={isLogin} aria-label="add to favorites">
                    <Like />
                </IconButton>
                <IconButton disabled={isLogin} aria-label="add to favorites">
                    <ImageSearchIcon onClick={() => history.push(`/post/postView/${post._id}`)} fontSize='large' />
                </IconButton>
                <IconButton disabled={isLogin} onClick={() => console.log(window.location.href + `post/postView/${post._id}`)} aria-label="share">
                    <ShareIcon />
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Story: {post.message}</Typography>
                    <Typography paragraph>Comments:</Typography>
                </CardContent>
            </Collapse>
            <div className={classes.search}>
                <InputBase
                    placeholder="Add your comment..."
                    fullWidth
                    inputProps={{ 'aria-label': 'search' }}
                />
            </div>
        </Card>
    );
}
