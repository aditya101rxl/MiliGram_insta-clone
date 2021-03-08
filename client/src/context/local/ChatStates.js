import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { GlobalContext } from '../global/GlobalStates';
import ChatReducer from './ChatReducer'
import * as api from '../../api'


const initialState = {
    chatList: [],
    activeChat: null,
}

export const ChatContext = createContext(initialState);

export const ChatProvider = ({ children }) => {

    const [state, dispatch] = useReducer(ChatReducer, initialState);
    const { user } = useContext(GlobalContext)

    useEffect(async () => {
        const chatlist = user?.friends;
        const { data } = await api.getChatList({ chatlist })
        dispatch({ type: 'CHATLIST', payload: data })
    }, [])

    const selectChat = (id) => {
        state.chatList.forEach(element => {
            if (element._id == id) {
                dispatch({ type: 'SELECT', payload: element })
            }
        });
    }

    const sendMsg = (msg) => {
        dispatch({ type: 'SEND', payload: msg })
    }


    return (
        <ChatContext.Provider value={{
            chatList: state.chatList,
            activeChat: state.activeChat,
            selectChat,
        }}>
            {children}
        </ChatContext.Provider>
    )
}

