import {getAPI, postAPI, refreshToken, requestPostAPI} from "./axios";
import {API_URL} from "../constants/constants";

const getToken = () => {
    return window.localStorage.getItem('access_token')
}

export const login = async (username, password) => {
    const response = await postAPI(`${API_URL}/login`, {username, password})

    return validResponseStatus(response)
}

export const signup = async (username, password) => {
    const response = await postAPI(`${API_URL}/player/create`, {username, password})

    return validResponseStatus(response)
}

export const getInvite = async () => {
    const token = getToken()
    const response = await requestPostAPI(`${API_URL}/gameroom/create/invite`, {}, token)

    return validResponseStatus(response)
}

export const getProfile = async () => {
    const token = getToken()
    const response = await getAPI(`${API_URL}/player/profile`, token)

    return validResponseStatus(response)
}

const validResponseStatus = async (response) => {
    if (response && response.status !== 403) return response

    await refreshToken()
}
