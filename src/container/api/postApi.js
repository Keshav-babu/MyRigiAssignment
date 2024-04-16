import axios from "axios";
import { API_BASE_URL, API_Key } from "./apiConfig";

export const getPostData = async (id) => {
    const config = {
        headers: {
            'Authorization': API_Key,
            'Content-Type': 'application/json'
        }
    };
    const response = await axios.get(`${API_BASE_URL}/posts/${id}`, config);
    return response.data;
}
