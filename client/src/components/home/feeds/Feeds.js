import React, { useEffect, useState, useContext } from 'react';

import clsx from 'clsx';
import { Fab, Paper, Card, CardHeader, CardMedia, CardContent, CardActions, TextField, InputBase } from '@material-ui/core'
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
    const { like, dislike, commentPost } = useContext(GlobalContext)
    const [open, setOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem('profile'))?.result?.username
    const isLogin = user === undefined

    const handleClickOpen = () => {
        console.log('enter')
        setOpen(true);
    };

    const handleClose = () => {
        console.log('leave')
        setOpen(false);
    };

    const handleLike = async () => {
        if (post.likes.indexOf(user) == -1) {
            post.likes.push(user);
            like({ data: post.likes, id: post._id, user });
        }
    }

    const handleDislike = async () => {
        post.likes.splice(post.likes.indexOf(user), 1);
        dislike({ data: post.likes, id: post._id, user });
    }

    const handleComment = (e) => {
        if (e.charCode === 13 && e.target.value.length > 0) {
            const cmnt = JSON.stringify({ username: user, comment: e.target.value });
            post.comments.push(cmnt)
            commentPost({ data: post.comments, comment: cmnt, id: post._id })
            e.target.value = ''
        }
    };

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
                title={<Typography onMouseEnter={handleClickOpen} onMouseLeave={handleClose} className={classes.user_dialog} variant='h6'>{post.username}</Typography>}
                subheader={post.createdAt}
            />
            <div className={classes.line} />
            <CardMedia
                onDoubleClick={handleLike}
                className={classes.media}
                image={post.file}
                title="image"
            />
            <CardActions>
                <IconButton disabled={isLogin} size='small'>
                    <Like />
                </IconButton>
                <IconButton disabled={isLogin} size='small'>
                    <ImageSearchIcon onClick={() => history.push(`/post/postView/${post._id}`)} fontSize='large' />
                </IconButton>
                <IconButton disabled={isLogin} size='small'>
                    <ShareIcon onClick={() => console.log(window.location.href + `post/postView/${post._id}`)} />
                </IconButton>
            </CardActions>
            <CardContent style={{ marginTop: '-21px' }}>
                <div>
                    <Typography color='textPrimary' variant='h6'>{post.likes.length} like{post.likes.length > 1 ? 's' : ''}</Typography>
                </div>
                <div>
                    <Typography className={classes.user_dialog} color='textPrimary' variant='h6'>{post.username}</Typography> &nbsp;{post.message} hello.. my first post
                </div>
                <div>
                    <Typography className={classes.user_dialog} color='textPrimary' variant='inherit'>{post.comments.length > 0 ? (`view all ${post.comments.length} comments`) : ('Be the first to comment')}</Typography>
                </div>
                { }
                {post.comments.length > 0 && (
                    <div>
                        <Typography className={classes.user_dialog} color='textPrimary' variant='h6'>
                            {JSON.parse(post.comments[post.comments.length - 1]).username}
                        </Typography> &nbsp;
                        {JSON.parse(post.comments[post.comments.length - 1]).comment}
                    </div>
                )}
                {post.comments.length > 1 && (
                    <div>
                        <Typography className={classes.user_dialog} color='textPrimary' variant='h6'>
                            {JSON.parse(post.comments[post.comments.length - 2]).username}
                        </Typography> &nbsp;
                        {JSON.parse(post.comments[post.comments.length - 2]).comment}
                    </div>
                )}
            </CardContent>
            <div className={classes.search}>
                <InputBase
                    placeholder="Add your comment..."
                    fullWidth
                    inputProps={{ 'aria-label': 'search' }}
                    onKeyPress={handleComment}
                />
            </div>
        </Card>
    );
}
