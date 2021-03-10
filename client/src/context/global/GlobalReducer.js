export default (state, action) => {
    switch (action.type) {
        case 'FETCH':
            return { ...state, posts: action.payload }
        case 'CREATE':
            return { ...state, posts: [action.payload, ...state.posts] }
        case 'SIGNIN':
        case 'SIGNUP':
            localStorage.setItem('profile', JSON.stringify({ token: action.payload.data.token, username: action.payload.data.user.username }));
            return { ...state, user: { ...action.payload.data.user, password: null }, socket: action.payload.socketio }
        case 'LOGOUT':
            localStorage.clear();
            return { ...state, user: action.payload }
        case 'USER':
            return { ...state, user: { ...action.payload.user, password: null }, socket: action.payload.socketio };
        case 'LIKE':
        case 'DISLIKE':
            return {
                ...state, posts: state.posts.map(post =>
                    post._id === action.payload.id ? (
                        { ...post, likes: action.payload.data }
                    ) : post)
            }
        case 'COMMENT':
            return {
                ...state, posts: state.posts.map(post =>
                    post._id === action.payload.id ? (
                        { ...post, comments: action.payload.data }
                    ) : post)
            }
        case 'DELETEPOST':
            return { ...state, posts: state.posts.filter(post => post._id !== action.payload) }
        default:
            return state;
    }
}