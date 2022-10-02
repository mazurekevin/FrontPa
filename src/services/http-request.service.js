import axios from 'axios';
//export const API_URL = 'https://instacodeapp.herokuapp.com';
export const API_URL = 'http://localhost:8081';


export const sendFormDataPostRequest = async (url, body, token) => {
    return axios.post(url,body);
   }