
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