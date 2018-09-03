
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