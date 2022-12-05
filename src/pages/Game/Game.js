import styled from "styled-components";
import {BattleBoard} from "../../components/BattleBoard/BattleBoard";
import {useState, useEffect} from "react";
import {GenerateGameRoom} from "../../components/GenerateGameRoom/GenerateGameRoom";
import {JoinGameRoom} from "../../components/JoinGameRoom/JoinGameRoom";
import {getProfile} from "../../utils/api";

export const Game = () => {
    const [yourProfile, setYourProfile] = useState(null)
    const [gameRoomId, setGameRoomId] = useState("")
    const [isJoin, setIsJoin] = useState(false)

    useEffect(() => {
        async function getYourProfile() {
            const response = await getProfile()

            if (response.status === 200) {
                setYourProfile({username: response.data.username})
            }
        }

        getYourProfile()
    }, [])

   return (
       <Container>
          <BattleBoard
              gameRoomId={gameRoomId}
              yourProfile={yourProfile}
          />
          <MenuContainer>
              <GenerateGameRoom
                  gameRoomId={gameRoomId}
                  setGameRoom={setGameRoomId}
              />
              <JoinGameRoom
                  setIsJoin={setIsJoin}
                  isJoin={isJoin}
                  yourProfile={yourProfile}
                  gameRoomId={gameRoomId}
                  setGameRoom={setGameRoomId}
              />
          </MenuContainer>
       </Container>
   )
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  
  & > div:first-child {
    flex: 3;
  }
  
  & > div:last-child {
    flex: 1;
  }
`

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #FFF7E9;
  padding: 2%;
  height: 100%;
`

