import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { GlobalContext } from '../global/GlobalStates';
import ChatReducer from './ChatReducer'


const initialState = {
    chatList: [],
    messageList: []
}

export const ChatContext = createContext(initialState);

export const ChatProvider = ({ children }) => {

    const [state, dispatch] = useReducer(ChatReducer, initialState);
    const { user } = useContext(GlobalContext)

    useEffect(() => {
        const {data} = 'a';
        const chatlist = user?.friends;
        dispatch({ type: 'MESSAGELIST', payload: data })
        console.log('chatProvider');
    }, [])


    return (
        <ChatContext.Provider value={{
            chatList: state.chatList,
        }}>
            {children}
        </ChatContext.Provider>
    )
}

