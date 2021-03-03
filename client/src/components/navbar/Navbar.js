import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { InputBase, AppBar, Toolbar, Typography, CssBaseline, useScrollTrigger, Box, Container, IconButton, Badge, Menu, MenuItem, Button, Avatar } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MessageIcon from '@material-ui/icons/Message';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import HomeIcon from '@material-ui/icons/Home';
import { useStyles } from './style';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link, useHistory, useLocation } from 'react-router-dom'

function ElevationScroll(props) {

    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: -1,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

export const Navbar = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))?.result);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const logout = () => {
        localStorage.clear();
        window.location.reload()
    }

    const handleProfileView = () => history.push(`/user/profile/${user?.username}`)

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile'))?.result)
    }, [location])


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MessageIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge color="secondary">
                        <ExitToAppIcon />
                    </Badge>
                </IconButton>
                <p>Logout</p>
            </MenuItem>
        </Menu>
    );

    return (
        <React.Fragment>
            <CssBaseline />
            <ElevationScroll {...props}>
                <div className={classes.grow}>
                    <AppBar color='default'>
                        <Toolbar>
                            <div className={classes.grow} />
                            <Typography className={classes.title} component={Link} to='/' variant="h6" noWrap> MiliGram</Typography>
                            <div className={classes.grow} />
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                            <div className={classes.grow} />
                            {
                                user ? (
                                    <>
                                        <div className={classes.sectionDesktop}>
                                            <IconButton
                                                edge="start"
                                                color="inherit"
                                                aria-label="open drawer"
                                                component={Link}
                                                to='/'
                                            >
                                                <Badge color="secondary">
                                                    <HomeIcon style={{ fontSize: '35px' }} />
                                                </Badge>
                                            </IconButton>
                                            <IconButton aria-label="show 4 new mails" color="inherit" component={Link} to='/user/inbox'>
                                                <Badge badgeContent={4} color="secondary">
                                                    <MessageIcon style={{ fontSize: '30px' }} />
                                                </Badge>
                                            </IconButton>
                                            <IconButton aria-label="show 17 new notifications" color="inherit">
                                                <Badge badgeContent={17} color="secondary">
                                                    <NotificationsIcon style={{ fontSize: '30px' }} />
                                                </Badge>
                                            </IconButton>
                                            <IconButton aria-label="show 4 new mails" color="inherit" onClick={handleProfileView}>
                                                <Badge color="secondary">
                                                    <Avatar className={classes.avatar} alt={user?.name} src={user?.profilePicture} />
                                                </Badge>
                                            </IconButton>
                                        </div>
                                        <Button variant='outlined' color="secondary" onClick={logout}>logout</Button>
                                        <div className={classes.sectionMobile}>
                                            <IconButton
                                                aria-label="show more"
                                                aria-controls={mobileMenuId}
                                                aria-haspopup="true"
                                                onClick={handleMobileMenuOpen}
                                                color="inherit"
                                            >
                                                <MoreIcon />
                                            </IconButton>
                                        </div>
                                    </>
                                ) : (
                                        <Button component={Link} to="/user/auth" variant='outlined' color='primary' >Sing In</Button>
                                    )
                            }

                        </Toolbar>
                    </AppBar>
                    {renderMobileMenu}
                    {renderMenu}
                </div>
            </ElevationScroll>
            <Toolbar />
            <Container>
                <Box my={1}>
                </Box>
            </Container>
        </React.Fragment >
    );
}
