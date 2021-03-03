import React from 'react';

import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useStyles } from './style'
import { useHistory } from 'react-router-dom'

export const Feeds = ({ post }) => {
    const classes = useStyles();
    const history = useHistory();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root} variant='outlined'>
            <CardHeader
                className={classes.removePadding}
                avatar={
                    <IconButton aria-label="show 4 new mails" color="inherit" onClick={() => history.push(`/user/profile/${post.username}`)}>
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {post.name.charAt(0)}
                        </Avatar>
                    </IconButton>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={post.name}
                subheader={post.createdAt}
            />
            <CardMedia
                className={classes.media}
                image={post.file}
                title="image"
                onClick={() => history.push(`/post/postView/${post._id}`)}
            />
            <CardContent className={classes.removePadding}>
                <Typography variant="body2" color="textSecondary" component="p">
                    {post.tags.map((tag) => `#${tag} `)}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
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
        </Card>
    );
}
