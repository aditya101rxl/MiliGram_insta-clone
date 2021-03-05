import React, { createContext, useReducer, useEffect } from 'react'
import GlobalReducer from './GlobalReducer'
import * as api from '../../api'


const initialState = {
    posts: []
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

    const like = (data, id, user) => {
        dispatch({ type: 'LIKE', payload: { id, data } })
        api.like({ id, user, islike: true });
    }

    const dislike = (data, id, user) => {
        dispatch({ type: 'DISLIKE', payload: { id, data } })
        api.like({ id, user, islike: false });
    }

    useEffect(() => {
        getPosts();
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
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

