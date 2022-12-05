import styled from "styled-components";
import {useState} from "react";
import {login, signup} from "../../utils/api";
import {useHistory} from "react-router-dom";

export const Signup = () => {
    const history = useHistory()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const setNome = (event) => {
        setUsername(event.target.value)
    }

    const setPass = (event) => {
        setPassword(event.target.value)
    }

    const setConfirmPass = (event) => {
        setConfirmPassword(event.target.value)
    }

    const sendSignup = async () => {
        if (username.length === 0 && password.length === 0 && confirmPassword.length === 0) {
            alert("Preencha os campos obrigatorios!")
        }

        if (password !== confirmPassword) {
            alert("A Confirmação de senha não bate com a senha")
            return
        }

        const response = await signup(username, password)

        if (response.status === 200) {
            history.push("/")
        } else {
            console.log('usuário ou senha inválido')
        }
    }

    return (
        <Container>
            <h1>Battleship</h1>
            <SubContainer>
                <label>
                    <span>username:</span>
                    <input onChange={setNome} type='text' placeholder="your username" value={username}/>
                </label>
                <label>
                    <span>password:</span>
                    <input onChange={setPass} type='password' placeholder="your password" value={password}/>
                </label>
                <label>
                    <span>confirm password:</span>
                    <input onChange={setConfirmPass} type='password' placeholder="confirm your password" value={confirmPassword}/>
                </label>
                <button onClick={sendSignup}>let's go to battle</button>
            </SubContainer>
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

const SubContainer = styled.div`
  background-color: #FFF7E9;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2%;
  border-radius: 6px;

  & > label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 2% 0;
    color: #FF731D;

    & > input {
      margin-top: 1%;
      width: 100%;
      border-radius: 6px;
      padding: 0.2em;
    }
  }

  & > button {
    cursor: pointer;
    color: white;
    background-color: #5F9DF7;
    border: none;
    letter-spacing: 1px;
    font-size: 1.2em;
    border-radius: 6px;
    padding: 1% 0;

    &:hover {
      background-color: #FF731D;
    }
  }
`