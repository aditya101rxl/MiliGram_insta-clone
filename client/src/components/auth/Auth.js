import React, { useState, useContext } from 'react'
import { Avatar, Container, Paper, Typography, Grid, TextField, Button } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { Dialog, DialogContent, DialogContentText, DialogTitle, IconButton } from '@material-ui/core'
import useStyle from './style'
import { GlobalContext } from '../../context/global/GlobalStates'
import { useHistory } from 'react-router-dom'
import Slide from '@material-ui/core/Slide';
import * as api from '../../api'
import CloseIcon from '@material-ui/icons/Close';
import { useSnackbar } from 'notistack'
import { Backdrop, CircularProgress } from '@material-ui/core'
import { LoadingAuth } from '../loading/auth'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const initialState = { username: '', firstname: '', lastname: '', email: '', password: '', confirmPassword: '' };

export const Auth = () => {
    // document.title = 'User Auth'
    const classes = useStyle()
    const history = useHistory()
    const [isSignup, setIsSignup] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(true);
    const [openEmailDialog, setOpenEmailDialog] = useState(false);
    const [loginFormData, setLoginFormData] = useState(initialState);

    const { enqueueSnackbar } = useSnackbar()

    const { signin, signup } = useContext(GlobalContext);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        document.title = 'loading...'
        setLoading(true);
        e.preventDefault()
        if (isSignup) {
            if (loginFormData.password !== loginFormData.confirmPassword) {
                const message = "password don't match !";
                enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 3000,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                });
            } else {
                signup(loginFormData, history);
            }
        } else {
            signin(loginFormData, history);
        }
    }
    const handleChange = (e) => setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
    const switchMode = () => { setIsSignup(prev => !prev); setIsEmailVerified(isSignup) }
    const [generatedOtp, setGeneratedOtp] = useState(null);
    const getOtp = async () => {
        if (loginFormData.email.indexOf('@') === -1) {
            const message = 'please enter valid email address !';
            enqueueSnackbar(message, {
                variant: 'warning',
                autoHideDuration: 3000,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            });
        } else {
            try {
                setOpenEmailDialog(true)
                const { data } = await api.getOtp({ email: loginFormData.email });
                console.log(data.otp);
                setGeneratedOtp(data.otp)
            } catch (error) {
                console.log(error);
                const message = 'something went wrong please try again !'
                enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 3000,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                });
            }
        }
    }

    const EmailVerification = () => {
        const [otp, setOtp] = useState('');
        const handleEmailVerification = () => {
            // console.log(generatedOtp);
            if (otp != generatedOtp) {
                const message = 'You have entered wrong otp !'
                enqueueSnackbar(message, {
                    variant: 'warning',
                    autoHideDuration: 3000,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                });
            } else {
                const message = 'email successfully verified.'
                enqueueSnackbar(message, {
                    variant: 'success',
                    autoHideDuration: 3000,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                });
                setOpenEmailDialog(false);
                setIsEmailVerified(prev => !prev);
            }
        }

        return (
            <>
                <DialogTitle id="alert-dialog-slide-title">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant='h4'>
                            {"Enter OTP"}
                        </Typography>
                        <IconButton onClick={() => setOpenEmailDialog(false)}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Enter the OTP sent on your given email address to verify your email.<br />
                        It helps to recover your password in case you forget it.
                        <TextField
                            autoFocus
                            margin="dense"
                            id="otp"
                            label="Enter OTP"
                            type="text"
                            fullWidth
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </DialogContentText>
                </DialogContent>
                <Button style={{ margin: '10px 20px', marginTop: '-10px' }} variant='outlined' onClick={handleEmailVerification} color="secondary">
                    Verify
                </Button>
            </>
        )
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant='h4'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField name='username' label='User Name' type='text' required fullWidth onChange={handleChange} />
                            </Grid>
                            {isSignup && (
                                <>
                                    <Grid item xs={12} sm={6}>
                                        <TextField name='firstname' label='First Name' type='text' required fullWidth onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField name='lastname' label='Last Name' type='text' required fullWidth onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField disabled={isEmailVerified} name='email' label='Email Address' type='email' required fullWidth onChange={handleChange} />
                                    </Grid>
                                </>
                            )}
                            <Grid item xs={12}>
                                <TextField name='password' label='Password' type='password' required fullWidth onChange={handleChange} />
                            </Grid>
                            {isSignup && (
                                <Grid item xs={12}>
                                    <TextField name='confirmPassword' label='Confirm Password' type='password' required fullWidth onChange={handleChange} />
                                </Grid>
                            )}
                        </Grid>
                        {!isEmailVerified && (
                            <>
                                <Button fullWidth variant="contained" color='primary' onClick={getOtp} className={classes.submit}>
                                    Verify email
                            </Button>
                                <Dialog
                                    open={openEmailDialog}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    // onClose={() => setOpenEmailDialog(false)}
                                    aria-labelledby="alert-dialog-slide-title"
                                    aria-describedby="alert-dialog-slide-description"
                                >
                                    <EmailVerification />
                                </Dialog>
                            </>
                        )}
                        <Button type='submit' disabled={!isEmailVerified} fullWidth variant="contained" color='primary' className={classes.submit}>
                            {isSignup ? 'Sign Up' : 'Sign In'}
                        </Button>
                    </form>
                    <Button className={classes.switch} onClick={switchMode}>
                        {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign In"}
                    </Button>
                </Paper>
            </Container >
            <Backdrop className={classes.backdrop} open={loading} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

