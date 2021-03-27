import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { GlobalContext } from '../global/GlobalStates';
import ChatReducer from './ChatReducer'
import * as api from '../../api'


const initialState = {
    chatList: null,
    activeChat: null,
    userInfo: null,
}

export const ChatContext = createContext(initialState);

export const ChatProvider = ({ children }) => {

    const [state, dispatch] = useReducer(ChatReducer, initialState);
    const { user } = useContext(GlobalContext)

    console.log('change in ChatState');
    useEffect(async () => {
        const chatlist = user?.friends;
        const { data } = await api.getChatList({ chatlist, user: user.username })
        dispatch({ type: 'CHATLIST', payload: data })
        return () => console.log('unmount chat state');
    }, [])

    const selectChat = async (userInfo) => {
        const id = userInfo._id;
        const { data } = await api.getChatMsg(id);
        console.log(data);
        dispatch({ type: 'SELECT', payload: { data, userInfo } });
    }
    const clearActiveChat = () => {
        dispatch({ type: 'CLEARCHAT', payload: { userInfo: null, data: null } });
    }

    return (
        <ChatContext.Provider value={{
            chatList: state.chatList,
            userInfo: state.userInfo,
            activeChat: state.activeChat,
            selectChat,
            clearActiveChat,
        }}>
            {children}
        </ChatContext.Provider>
    )
}

