import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'

export const useProtectedPage = () => {
    const history = useHistory()

    useEffect(() => {
        const token = window.localStorage.getItem('access_token')
        const refresh_token = window.localStorage.getItem('refresh_token')

        if (!token || !refresh_token) {
            history.push('/')
        }
    }, [history])
}