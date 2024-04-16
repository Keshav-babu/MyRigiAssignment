import axios from "axios";
import { API_BASE_URL, API_Key } from "./apiConfig";
import { apiDataLimit } from "../../config/constants";

export const getAllUsersData = async () => {
    const config = {
        headers: {
            'Authorization': API_Key,
            'Content-Type': 'application/json'
        }
    };
    const response = await axios.get(`${API_BASE_URL}/users`, config);
    return response.data;
}



export const getAllPostsData = async ( payload) => {

    const {page = 1,query=undefined} = payload
    const config = {
        headers: {
            'Authorization': API_Key,
            'Content-Type': 'application/json'
        },
        params: {
            limit: apiDataLimit,
            page:page,
            query: query
        }
    };
    const response = await axios.get(`${API_BASE_URL}/posts`, config);
    return response.data;
}