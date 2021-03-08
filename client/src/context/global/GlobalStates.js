import React, { createContext, useReducer, useEffect, useState } from 'react'
import GlobalReducer from './GlobalReducer'
import * as api from '../../api'
import socketio from 'socket.io-client';


const initialState = {
    posts: [],
    user: null
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {

    const [state, dispatch] = useReducer(GlobalReducer, initialState);

    // Authorization actions
    const signin = async (formData, history) => {
        try {
            const { data } = await api.signin(formData)
            console.log(data);
            dispatch({ type: 'SIGNIN', payload: data })
            history.push('/')
        } catch (error) {
            console.log(error);
        }
    }

    const signup = async (formData, history) => {
        try {
            const { data } = await api.signup(formData);
            dispatch({ type: 'SIGNUP', payload: data })
            history.push('/')
        } catch (error) {
            console.log(error);
        }
    }
    const logout = () => {
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

    const editUser = (data) => {
        dispatch({ type: 'USER', payload: data });
    }

    // socket connection if user exist
    useEffect(() => {
        console.log('user changed..');
    }, [state.user])

    useEffect(() => {
        getPosts();
        const username = JSON.parse(localStorage.getItem('profile'))?.username
        if (username != undefined) {
            api.findUser(username).then(user => {
                dispatch({ type: 'USER', payload: user.data });
            })
        }
    }, [])

    return (
        <GlobalContext.Provider value={{
            posts: state.posts,
            user: state.user,
            signin,
            signup,
            logout,
            createPost,
            getPosts,
            like,
            dislike,
            commentPost,
            editUser,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

