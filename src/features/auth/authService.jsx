import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

const login = async (user) =>{
    const response = await axios.post(`${baseUrl}/user/login`, user);
    if(response.data) {
        localStorage.setItem("user",JSON.stringify(response.data.user));
    }
    return response.data;
}



const signup = async (user) =>{
    const response = await axios.post(`${baseUrl}/user/signup`, user);
    return response.data;
}

const authService = {
    login,
    signup
}

export default authService;