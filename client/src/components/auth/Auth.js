import React, { useState, useContext } from 'react'
import { Avatar, Container, Paper, Typography, Grid, TextField, Button } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyle from './style'
import { GlobalContext } from '../../context/global/GlobalStates'

import { useHistory } from 'react-router-dom'



const initialState = { username: '', firstname: '', lastname: '', email: '', password: '', confirmPassword: '' };

export const Auth = () => {
    const classes = useStyle()
    const history = useHistory()
    const [isSignup, setIsSignup] = useState(false);
    const [loginFormData, setLoginFormData] = useState(initialState);

    const { signin, signup } = useContext(GlobalContext);

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSignup) {
            console.log('signing up');
            if (loginFormData.password !== loginFormData.confirmPassword) {
                alert(`password don't match`);
            } else {
                signup(loginFormData, history);
            }
        } else {
            console.log('signing in');
            signin(loginFormData, history);
        }
    }
    const handleChange = (e) => setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
    const switchMode = () => setIsSignup(prev => !prev)

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h4'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
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
                                    <TextField name='email' label='Email Address' type='email' required fullWidth onChange={handleChange} />
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
                    <Button type='submit' fullWidth variant="contained" color='primary' className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                </form>
                <Button className={classes.switch} onClick={switchMode}>
                    {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign In"}
                </Button>
            </Paper>
        </Container>
    )
}

