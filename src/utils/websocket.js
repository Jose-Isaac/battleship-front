import {WS_URL} from "../constants/constants";
import SockJs from "sockjs-client"
import Stomp from "stompjs"

export const connectToTopic = (topic) => {
    // const token = window.localStorage.getItem("access_token")
    // return new WebSocket(`ws://${token}@localhost:8080/${topic}`);
    return new WebSocket(`${WS_URL}/${topic}`);
}