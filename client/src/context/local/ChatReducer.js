export default (state, action) => {
    switch (action.type) {
        case 'CHATLIST':
            return { ...state, chatList: action.payload }
        case 'SELECT':
        case 'CLEARCHAT':
            return {
                ...state,
                activeChat: action.payload.data,
                userInfo: action.payload.userInfo,
            }
        default:
            return state;
    }
}