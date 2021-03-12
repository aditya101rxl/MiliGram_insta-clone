import React, { createContext, useReducer, useEffect, useState } from 'react'
import GlobalReducer from './GlobalReducer'
import * as api from '../../api'
import io from 'socket.io-client'


const initialState = {
    posts: [],
    user: null,
    socket: null,
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {

    const [state, dispatch] = useReducer(GlobalReducer, initialState);

    // Authorization actions
    const signin = async (formData, history) => {
        try {
            const { data } = await api.signin(formData)
            console.log(data);
            const socketio = io.connect('http://localhost:5000', { query: { user: data.username } });
            dispatch({ type: 'SIGNIN', payload: { data, socketio } })
            history.push('/')
        } catch (error) {
            console.log(error);
        }
    }

    const signup = async (formData, history) => {
        try {
            const { data } = await api.signup(formData);
            const socketio = io.connect('http://localhost:5000', { query: { user: data.username } });
            dispatch({ type: 'SIGNUP', payload: { data, socketio } })
            history.push('/')
        } catch (error) {
            console.log(error);
        }
    }

    const logout = () => {
        api.logout();
        dispatch({ type: 'LOGOUT', payload: null })
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
        api.comment({ _id: id, comment });
        dispatch({ type: 'COMMENT', payload: { id, data } });
    }

    const deletePost = ({ _id }) => {
        api.deletePost(_id).then(({ data }) => {
            console.log(data);
        })
        dispatch({ type: 'DELETEPOST', payload: _id });
    }

    const editUser = (data) => {
        dispatch({ type: 'USER', payload: data });
    }

    useEffect(() => {
        getPosts();
        // return () => socketio.close();
        const username = JSON.parse(localStorage.getItem('profile'))?.username
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
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

