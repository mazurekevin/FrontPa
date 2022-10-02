import {API_URL, sendGetRequest} from "./http-request.service";

export const getUsers = async () => {
    return (await sendGetRequest(API_URL + "user/getAll")).json();
};

export const getUser = async (id) => {
    return (await sendGetRequest(API_URL + "user/get/"+ id)).json();
};