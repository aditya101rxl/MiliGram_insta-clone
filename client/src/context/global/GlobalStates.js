import React, { createContext, useReducer, useEffect } from 'react'
import GlobalReducer from './GlobalReducer'
import * as api from '../../api'
import io from 'socket.io-client'
import Cookies from 'universal-cookie';
import { useSnackbar } from 'notistack'


const initialState = {
    posts: [],
    user: null,
    socket: null,
}

export const GlobalContext = createContext(initialState)
const cookies = new Cookies();

export const GlobalProvider = ({ children }) => {

    const [state, dispatch] = useReducer(GlobalReducer, initialState);
    const { enqueueSnackbar } = useSnackbar()
    // Actions
    const signin = async (formData, history) => {
        try {
            let variant = 'error'
            const { data } = await api.signin(formData)
            if (data.user != undefined) {
                const socketio = io.connect('http://localhost:5000', { query: { user: data.user?.username } });
                const token = { token: data.token, username: data.user.username };
                cookies.set('jwt', token, { maxAge: 7 * 60 * 60 });
                dispatch({ type: 'SIGNIN', payload: { data, socketio } })
                history.push('/')
                variant = 'success'
            }
            enqueueSnackbar(data.message, {
                variant,
                autoHideDuration: 2500,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            });
        } catch (error) {
            console.log(error);
            const message = "something went wrong, try again !";
            enqueueSnackbar(message, {
                variant: 'error',
                autoHideDuration: 2500,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            });
        }
    }

    const signup = async (formData, history) => {
        try {
            const { data } = await api.signup(formData);
            const socketio = io.connect('http://localhost:5000', { query: { user: data.user.username } });
            const token = { token: data.token, username: data.user.username };
            cookies.set('jwt', token, { maxAge: 7 * 60 * 60 });
            dispatch({ type: 'SIGNUP', payload: { data, socketio } })
            history.push('/')
        } catch (error) {
            console.log(error);
        }
    }

    const logout = () => {
        cookies.remove('jwt');
        dispatch({ type: 'LOGOUT', payload: null })
        window.location.reload();
    }

    const createPost = async (formData, history) => {
        try {
            const { data } = await api.createPost(formData);
            console.log(data);
            dispatch({ type: 'CREATE', payload: data })
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const getPosts = async () => {
        try {
            const { data } = await api.getPosts();
            dispatch({ type: 'FETCH', payload: data })
        } catch (error) {
            console.log(error);
        }
    }

    const like = ({ data, id, user }) => {
        api.like({ _id: id, username: user, islike: true });
        dispatch({ type: 'LIKE', payload: { id, data } })
    }

    const dislike = ({ data, id, user }) => {
        api.like({ _id: id, username: user, islike: false });
        dispatch({ type: 'DISLIKE', payload: { id, data } })
    }

    const commentPost = ({ data, comment, id }) => {
        api.comment({ _id: id, comment, user: state.user?.username });
        dispatch({ type: 'COMMENT', payload: { id, data } });
    }

    const deletePost = ({ _id }) => {
        api.deletePost(_id).then(({ data }) => {
            console.log(data);
        })
        dispatch({ type: 'DELETEPOST', payload: _id });
    }

    const editUser = (data) => {
        const updatedUser = { user: data };
        dispatch({ type: 'USER', payload: updatedUser });
    }

    const clearNotice = () => {
        api.clearNotice(state?.user?.username);
        dispatch({ type: 'CLEAR', payload: 0 })
    }

    useEffect(() => {
        getPosts();
        // return () => socketio.close();
        const username = cookies.get('jwt')?.username
        if (username != undefined) {
            api.findUser(username).then(user => {
                const socketio = io.connect('http://localhost:5000', { query: { user: username } });
                dispatch({ type: 'USER', payload: { user: user.data, socketio } });
            })
        }
    }, [])

    return (
        <GlobalContext.Provider value={{
            posts: state.posts,
            user: state.user,
            socket: state.socket,
            signin,
            signup,
            logout,
            createPost,
            getPosts,
            like,
            dislike,
            commentPost,
            deletePost,
            editUser,
            clearNotice,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

