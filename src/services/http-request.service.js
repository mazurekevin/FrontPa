import axios from 'axios';
//export const API_URL = 'https://instacodeapp.herokuapp.com';
//export const API_URL = 'http://54.162.32.122:8080';
export const API_URL = 'http://141.94.245.122:8081';

export const sendFormDataPostRequest = async (url, body, token) => {
    return axios.post(url,body);
   }