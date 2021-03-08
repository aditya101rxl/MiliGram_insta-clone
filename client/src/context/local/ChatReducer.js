export default (state, action) => {
    switch (action.type) {
        case 'CHATLIST':
            return { ...state, chatList: action.payload }
        case 'SELECT':
            return { ...state, activeChat: action.payload }
        case 'SEND':
            return { ...state, activeChat: { ...state.activeChat, message: action.payload } }
        default:
            return state;
    }
}