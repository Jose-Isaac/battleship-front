import styled from "styled-components";
import {Target} from "../Target/Target";
import {useWSConnector} from "../../hooks/useWSConnector";

export const Board = ({profile, board, setBoard, adversaryProfile}) => {
    const [wsClient] = useWSConnector()

    const attack = (coordinate) => {
        const attackPayload = {
            gameRoomId: board.gameRoomId,
            boardAttackId: board.id,
            attackingPlayer: adversaryProfile.username,
            coordinate
        }

        wsClient.send("/app/attack", {}, JSON.stringify(attackPayload))
    }

    const buildBoard = () => {
        const isVisibleOccupied = profile !== null && profile !== undefined
        let keyIncrement = 1
        console.log("board -> gameroom id: " + board.gameRoomId)
        console.log(`\n\n*** board type: ${typeof board}***\n\nboard: ${board.plays[0][0].axisX}`)
        return board.plays.map(
            it => it.map(
                coordinate => <Target
                    coordinate={coordinate}
                    key={keyIncrement++}
                    isVisibleOccupied={isVisibleOccupied}
                    attack={attack}
                />
            )
        )
    }

    const setPlayerName = () => {
        if (board) return board.player
        if (profile) return profile.username
        return ""
    }
    return(
        <Container>
            <p>@{setPlayerName()}</p>
            <SubContainer>
                { board && buildBoard()}
            </SubContainer>
        </Container>
    )
}

const Container = styled.div`
    & > p {
      text-align: left;
      color: white;
    }
`

const SubContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-column-gap: 0;
  grid-row-gap: 0;
  width: 100%;
  height: 100%;
  background-color: #5F9DF7;
  border-radius: 6px;
`