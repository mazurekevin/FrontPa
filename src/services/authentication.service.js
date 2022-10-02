import {API_URL} from "./http-request.service";
import axios from "axios";

const BASE_URL= API_URL + "/api/auth";

class AuthenticationService {
     login(user) {
            return axios.post(BASE_URL + '/signin', user);
        }

        register(user) {
            return axios.post(BASE_URL + '/signup', user);
        }
}

export default new AuthenticationService();
