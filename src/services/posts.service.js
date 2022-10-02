import {API_URL, sendFormDataPostRequest} from "./http-request.service";


export const sendData = async (name, code, language, caption, like) => {
    const data = new FormData();
    data.append("name", name);
    data.append("code", code);
    data.append("language", language);
    data.append("caption", caption);
    data.append("likeCount", like);
    return (await sendFormDataPostRequest(API_URL + "/api/posts", data)).body;
};

export const sendComment = async (username, comment, id) => {
    const data = new FormData();
    data.append("username", username);
    data.append("body", comment);
    return (await sendFormDataPostRequest(API_URL + "/api/"+ id +"/comments", data)).body;
};