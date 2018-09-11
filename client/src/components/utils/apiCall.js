
import axios from 'axios';

const callAPI = async function(method, url , data={}){
    return axios({
        method: method,
        url: url,
        data: data
    });
};

export const getApiTestData = () => {
    return callAPI('get', '/api/test');
}
export const getTopPostData = () => {
    return callAPI('get', '/api/toppost');
}
export const getAuthorDetails = (authorName) => {
    return callAPI('get', '/api/authordetails/' + authorName);
}



export const addNewPost = (data) => {
    return callAPI('post', '/api/addpost', data);
}
export const addNewAuthor = (data) => {
    return callAPI('post', '/api/addauthor', data);
}
export const addComment = (data) => {
    return callAPI('post', '/api/addcomment', data);
}
export const authenticateUser = (data) => {
    return callAPI('post', '/api/authenticateuser', data);
}
export const newAuthenticateUser = (data) => {
    return callAPI('post', '/api/newauthenticateuser', data);
}
export const createNewUserProfile = (data) => {
    return callAPI('post', '/api/createuserprofile', data);
}
export const fetchprofiledata = (data) => {
    return callAPI('post', '/api/fetchprofiledata', data);
}
export const updateuserprofiledata = (data) => {
    return callAPI('post', '/api/updateuserprofiledata', data);
}



export const currentUserDetails = (data) => {
    return callAPI('get', '/api/currentuserdetails', data);
}
export const signoutuser = (data) => {
    return callAPI('get', '/api/signoutuser', data);
}
