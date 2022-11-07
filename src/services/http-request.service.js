import axios from 'axios';
//export const API_URL = 'https://instacodeapp.herokuapp.com';
//export const API_URL = 'http://54.162.32.122:8080';
export const API_URL = 'http://192.168.1.82:8080';

export const sendFormDataPostRequest = async (url, body, token) => {
    return axios.post(url,body);
   }