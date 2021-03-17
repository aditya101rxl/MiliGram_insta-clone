import axios from 'axios'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const API = axios.create({ baseURL: 'http://localhost:5000' });

// authorization of user in middleware
API.interceptors.request.use((req) => {
    if (cookies.get('jwt') !== undefined) {
        req.headers.Authorization = `token ${cookies.get('jwt').token}`;
    }
    return req;
});


export const getOtp = (data) => API.post('/user/getOtp', data);
export const signin = (signinData) => API.post('/user/signin', signinData);
export const signup = (signupData) => API.post('/user/signup', signupData);
export const logout = () => API.get('/user/logout');
export const findUser = (username) => API.get(`/user/profile/${username}`);
export const updateProfile = (id, data) => API.patch(`/user/profile/update/${id}`, data);
export const searchQuery = (query) => API.get(`/user/searchQuery/${query}`);
export const clearNotice = (username) => API.patch(`/user/clearNotice/${username}`)


export const getOtpToSetNewPassword = (data) => API.post('/user/forgetPassword', data);
export const setNewPassword = (data) => API.patch('/user/setNewPassword', data);


export const followRequest = (data) => API.patch(`/user/follow/sendRequest`, data);
export const confirmFollowRequest = (data) => API.patch(`/user/follow/confirmRequest`, data);
export const cancelFollowRequest = (data) => API.patch(`/user/follow/cancelRequest`, data);


export const getPosts = () => API.get('/post');
export const findPost = (_id) => API.get(`/post/${_id}`)
export const createPost = (data) => API.post(`/post/createPost`, data);
export const like = (data) => API.patch('/post/like', data);
export const comment = (data) => API.post('/post/comment', data);
export const deletePost = (_id) => API.delete(`/post/${_id}`)


export const getChatList = (data) => API.post('/inbox/chatlist', data);
export const sendMsg = (data) => API.post('/inbox/sendmsg', data);