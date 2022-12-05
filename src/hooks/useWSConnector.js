import {useEffect, useState} from "react";
import SockJs from "sockjs-client";
import {API_URL} from "../constants/constants";
import Stomp from "stompjs";

export const useWSConnector = () => {
    const [wsClient, setWsClient] = useState(null)

    useEffect(()=> {
        if (wsClient === null) {
            console.log("\n\n*** client is null *** \n\n")
            const sockjs = new SockJs(`${API_URL}/ws`)
            const stomp = Stomp.over(sockjs)
            stomp.connect(
                {}, {}, (error) => {console.log(error)})
            setWsClient(stomp)
        }
    }, [wsClient])

    return [wsClient]
}