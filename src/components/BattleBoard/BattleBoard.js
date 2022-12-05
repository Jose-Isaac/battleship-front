import styled from "styled-components";
import {Board} from "../Board/Board";
import {useEffect, useState} from "react";
import {useWSConnector} from "../../hooks/useWSConnector";

export const BattleBoard = ({gameRoomId, yourProfile}) => {
    const [wsClient] = useWSConnector()
    const [adversaryProfile, setAdversaryProfile] = useState(null)
    const [yourBoard, setYourBoard] = useState(null)
    const [adversaryBoard, setAdversaryBoard] = useState(null)
    const [turnInfo, setTurnInfo] = useState(null)

    useEffect(() => {
        if (wsClient !== null && gameRoomId !== "") {
            wsClient.subscribe(`/topic/gameroom/${gameRoomId}/response`, onJoinMessage)
        }
    }, [wsClient, gameRoomId])

    const onJoinMessage = (payload) => {
        const body = JSON.parse(payload.body)
        handleMessage(body)
        wsClient.subscribe(`/topic/gameroom/${body.gameRoomId}/response`, onMessage)
    }

    const onMessage = (payload) => {
        console.log("attack payload: \n" + payload)
        const body = JSON.parse(payload.body)
        handleMessage(body)
    }

    const handleMessage = (payload) => {
        if (payload.playerOne !== yourProfile.username) {
            setAdversaryProfile({username: payload.playerOne})
            setAdversaryBoard({...payload.boardOne, gameRoomId: payload.gameRoomId})
            setYourBoard({...payload.boardTwo, gameRoomId: payload.gameRoomId})
        } else {
            setAdversaryProfile({username: payload.playerTwo})
            setAdversaryBoard({...payload.boardTwo, gameRoomId: payload.gameRoomId})
            setYourBoard({...payload.boardOne, gameRoomId: payload.gameRoomId})
        }

        if (payload.winner !== null && payload.winner !== undefined) {
            console.log("ooo temos um vencedor o/o/o/ player: " + payload.winner)
        }

        setTurnInfo({turn: payload.turn, player: payload.playerTurn, winner: payload.winner})
    }

    return (
        <Container>
            <BoardsContainer>
                <Board
                    profile={yourProfile}
                    board={yourBoard}
                    setBoard={setYourBoard}
                    adversaryProfile={adversaryProfile}
                    positionTop
                />
                <Board
                    board={adversaryBoard}
                    setBoard={setAdversaryBoard}
                    adversaryProfile={yourProfile}
                />
            </BoardsContainer>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #16213E;
`

const BoardsContainer = styled.div`
  width: 85%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2%;
  
  & > div {
    width: 45%;
    height: 50%;
  }
`