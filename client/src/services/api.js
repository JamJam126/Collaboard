import axios from "axios"
import axiosInstance from "./axiosInstance";

const API_BASE_URL = "http://localhost:5000/api"

export const ping = async () => {
    const response = await axios.get(`${API_BASE_URL}/health`);
    return response.data;
}

export const getBoards = async () => {
    const response = await axiosInstance.get(`/board`);
    return response.data;
}

export const getBoardById = async (id) => {
    const response = await axiosInstance.get(`/board/${id}`)
    return response.data
}

export const createBoards = async (title, description, visibility) => {
    const payload = {
        title,
        description,
        visibility
    }

    const response = await axiosInstance.post('/board', payload)
    return response.data
}

export const createList = async (board_id, title) => {
    const payload = {
        board_id, 
        title
    }

    const response = await axiosInstance.post('/list', payload)
    return response.data
}

export const inviteUser = async (id, invitedUser, role) => {
    const payload = {
        invitedUser,
        role
    }

    const response = await axiosInstance.post(`/board/${id}/invite`, payload);
    return response.data;
}

export const getUserProfile = async () => {

    const response = await axiosInstance.get('/profile')
    return response.data
}

export const uploadProfileAvatar = async (public_id, secure_url) => {

    const payload = {
        public_id,
        secure_url
    }

    const response = await axiosInstance.post('/profile/upload', payload)
    return response.data
}