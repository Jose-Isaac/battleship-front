import axios from "axios";
import {API_URL} from "../constants/constants";


export const postAPI = async (url, data) => {
    try {
        return await axios.post(url, JSON.stringify(data),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    } catch (error) {
        console.log(`Erro request api in ${url} receive error ${error}`)
    }
}

export const requestPostAPI = async (url, data, token) => {
    try {
        return await axios.post(url, JSON.stringify(data),
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    } catch (error) {
        console.log(`Erro request api in ${url} receive error ${error}`)
    }
}

export const getAPI = async (url, token) => {
    try {
        return await axios.get(url,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    } catch (error) {
        console.log(`Erro request api in ${url} receive error ${error}`)
    }
}

export const refreshToken = async () => {
    try {
        const refresh_token = window.localStorage.getItem('refresh_token')

        const res = await axios.post(`${API_URL}/refresh/token`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${refresh_token}`
                }
            }
        )

        if (res.status === 201) {
            const access_token = res.headers.get('access_token')
            window.localStorage.setItem('access_token', access_token)
        }

    } catch (error) {
        console.log(`Erro refresh token, receive error ${error}`)
    }
}

