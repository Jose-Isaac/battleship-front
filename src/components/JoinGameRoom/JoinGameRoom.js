import styled from "styled-components";
import {useWSConnector} from "../../hooks/useWSConnector";
import {useState} from "react";

export const JoinGameRoom = (
    {
        setIsJoin,
        isJoin,
        gameRoomId,
        setGameRoom,
        yourProfile
    }
) => {
    const [wsClient] = useWSConnector()
    const [invite, setInvite] = useState("")

    const join = () => {
        setGameRoom(invite)
        console.log("join room: username: " + yourProfile)
        wsClient.send(
            "/app/join",
            {},
            JSON.stringify(
                {inviteId: invite, username: yourProfile.username}
            )
        )
    }

    const onChange = (event) => {
        setInvite(event.target.value)
    }

    const onClick = () => {
        setIsJoin(true)
    }

    return (
        <Container>
            {
                isJoin ? <div>
                    <input
                        onChange={onChange}
                        value={invite}
                        type="text"
                        placeholder="paste your invite"/>
                    <button onClick={join}>Join</button>
                </div>
                : <button onClick={onClick}>Join game room</button>
            }
        </Container>
    )
}

const Container = styled.div`
    & > button {
      width: 100%;
      cursor: pointer;
    }
  
    & > div {
      width: 100%;
      display: flex;
      
      & > button {
        margin-left: 1%;
        cursor: pointer;
        flex: 1;
      } 
      
      & > input {
        flex: 2;
      }
    }
`