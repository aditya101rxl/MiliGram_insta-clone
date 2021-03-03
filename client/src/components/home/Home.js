import React, { useEffect, useContext } from 'react'
import { Grid, Box } from '@material-ui/core'
import { Feeds } from './feeds/Feeds';
import { Profile } from './profile/Profile'
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from '../../context/global/GlobalStates'

const useStyles = makeStyles((theme) => ({
    sectionMobile: {
        // display: 'flex',
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
}));

export const Home = () => {

    const classes = useStyles();

    const { posts } = useContext(GlobalContext);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
                <Box component="div" height="86vh" overflow="auto" >
                    {posts.length ? (
                        posts.map(post => <Feeds post={post} />)
                    ) : (
                            <LinearProgress color="secondary" />
                        )}
                </Box>
            </Grid>
            <Grid item xs={12} sm={4} className={classes.sectionMobile}>
                <Profile />
            </Grid>
        </Grid>
    )
}


