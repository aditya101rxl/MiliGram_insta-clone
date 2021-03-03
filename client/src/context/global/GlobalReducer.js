export default (state, action) => {
    switch (action.type) {
        case 'FETCH':
            return { ...state, posts: action.payload }
        case 'CREATE':
            return { ...state, posts: [action.payload, ...state.posts] }
        case 'SIGNIN':
        case 'SIGNUP':
            localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
            return { ...state, user: action.payload }
        case 'LOGOUT':
            localStorage.clear();
            return { ...state, user: action.payload }
        default:
            return state;
    }
}