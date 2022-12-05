import styled from "styled-components";
import {Login} from "../../components/Login/Login";

export const Home = () => {
    return (
        <Container>
            <h1>Battleship</h1>
            <div>
                <Login/>
            </div>
        </Container>
    )
}

const Container = styled.div`
  background-image: url("./initial_background.jpg");
  background-size: cover;
  background-position: center;
  opacity: 0.7;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #f2a951;

  & > h1 {
    font-family: 'Bebas Neue', cursive;
    text-transform: uppercase;
    letter-spacing: .1em;
    color: white;
    font-size: 6em;
  }
  
  & > div {
    width: 30%;
  }
`