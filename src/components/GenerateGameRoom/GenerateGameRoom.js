import styled from "styled-components";
import {getInvite} from "../../utils/api";

export const GenerateGameRoom = ({gameRoomId, setGameRoom}) => {

    const onClick = async () => {
        const response = await getInvite()

        if (response.status === 200) {
            setGameRoom(response.data.invite)
        }
    }

    return (
        <Container>
            <button disabled={gameRoomId !== ""} onClick={onClick}>Generate a new game room</button>
            <p>{gameRoomId}</p>
        </Container>
    )
}

const Container = styled.div`
  & > button {
    width: 100%;
    cursor: pointer;
  }
  
  & > p {
    margin-top: 2%;
  }
`