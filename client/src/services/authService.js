import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api"

export const loginApi=async(user)=>{
    const res = await axios.post(`${API_BASE_URL}/user/login`, { email:user.email,password:user.password});
    return res.data;
}

export const registerApi=async(user)=>{
    const res = await axios.post(`${API_BASE_URL}/user/register`, { email:user.email,name:user.name,password:user.password});
    return res.data;
}