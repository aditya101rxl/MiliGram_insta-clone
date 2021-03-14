import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { GlobalContext } from '../global/GlobalStates';
import ChatReducer from './ChatReducer'
import * as api from '../../api'
import { useHistory } from 'react-router-dom'


const initialState = {
    chatList: [],
    activeChat: null,
}

export const ChatContext = createContext(initialState);

export const ChatProvider = ({ children }) => {

    const history = useHistory();
    const [state, dispatch] = useReducer(ChatReducer, initialState);
    const { user, socket } = useContext(GlobalContext)

    useEffect(async () => {
        const chatlist = user?.friends;
        const { data } = await api.getChatList({ chatlist })
        console.log(data?.mewwsage);
        if (data?.message === undefined) {
            dispatch({ type: 'CHATLIST', payload: data })
        } else {
            console.log(data.message);
        }
    }, [])

    const selectChat = (id) => {
        state.chatList.forEach(element => {
            if (element._id == id) {
                dispatch({ type: 'SELECT', payload: element })
            }
        });
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

