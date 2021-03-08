import React, { useContext, useState, useEffect } from 'react'
import * as api from '../../api'
import { Button } from '@material-ui/core'
import { GlobalContext } from '../../context/global/GlobalStates';
import { useStyles } from './profile/style';

export const Follow = ({ username, profilePicture }) => {
    const classes = useStyles()
    const [followState, setFollowState] = useState(null);
    const { user } = useContext(GlobalContext);

    useEffect(() => {
        if (user?.followRequest.indexOf(username) !== -1) { console.log('cnf'); setFollowState('confirm') }
        else if (user?.pendingRequest.indexOf(username) !== -1) { console.log('cnc'); setFollowState('cancel') }
        else if (user?.following.indexOf(username) != -1) { console.log('unf'); setFollowState('followback') }
        else if (user?.followers.indexOf(username) != -1) { console.log('flobak'); setFollowState('unfollow') }
        else { console.log('flo'); setFollowState('follow') }
    }, [])

    const handleFollow = async () => {
        await api.followRequest({ user1: user?.username, user2: username, isFollow: true })
        setFollowState('cancel')
    }
    const handleUnfollow = async () => {
        await api.followRequest({ user1: user?.username, user2: username, isFollow: false });
        setFollowState('follow')
    }
    const handleConfirmRequest = async () => {
        const data = {
            user1: { username: user?.username, profilePicture: user?.profilePicture },
            user2: { username: username, profilePicture: profilePicture },
            isFriend: (user?.followers.indexOf(username) != -1) || (user?.following.indexOf(username) != -1)
        }
        await api.confirmFollowRequest(data);
        setFollowState('unfollow')
    }
    const handleCancelRequest = async () => {
        await api.cancelFollowRequest({ user1: user?.username, user2: username })
        setFollowState('follow')
    }

    if (followState == 'follow') {
        return (
            <Button fullWidth variant="outlined" color="secondary" onClick={handleFollow} className={classes.margin}> Follow </Button>
        )
    }
    if (followState == 'unfollow') {
        return (
            <Button fullWidth variant="outlined" color="secondary" onClick={handleUnfollow} className={classes.margin}> Unfollow </Button>
        )
    }
    if (followState == 'confirm') {
        return (
            <Button fullWidth variant="outlined" color="secondary" onClick={handleConfirmRequest} className={classes.margin}> confirm request </Button>
        )
    }
    if (followState == 'cancel') {
        return (
            <Button fullWidth variant="outlined" color="secondary" onClick={handleCancelRequest} className={classes.margin}> cancel request </Button>
        )
    }
    if (followState == 'followback') {
        return (
            <Button fullWidth variant="outlined" color="secondary" onClick={handleFollow} className={classes.margin}> follow back </Button>
        )
    }
    return (
        <Button fullWidth disabled variant="outlined" color="secondary" className={classes.margin}> loading... </Button>
    )
}

