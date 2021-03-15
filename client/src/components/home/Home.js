import React, { useContext } from 'react'
import { Grid, Box } from '@material-ui/core'
import { Feeds } from './feeds/Feeds';
import { Profile } from './profile/Profile'
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from '../../context/global/GlobalStates'
import { LoadingFeed } from '../loading/home'

const useStyles = makeStyles((theme) => ({
    sectionMobile: {
        // display: 'flex',
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    scrollbar: {
        '&::-webkit-scrollbar': {
            display: 'none'
        }
    }
}));

export const Home = () => {

    document.title = 'Home'
    const classes = useStyles();
    const { posts, user } = useContext(GlobalContext);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
                <Box component="div" style={{ marginTop: '5px' }} className={classes.scrollbar}>
                    {posts.length ? (
                        posts.map(post => <Feeds post={post} />)
                    ) : (
                        <LoadingFeed />
                    )}
                </Box>
            </Grid>
            <Grid item xs={12} sm={4} className={classes.sectionMobile}>
                <div style={{ height: '100%' }}>
                    <Profile />
                </div>
            </Grid>
        </Grid >
    )
}


