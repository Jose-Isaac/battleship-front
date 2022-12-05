import styled from "styled-components";
import {useState} from "react";
import {login} from "../../utils/api";
import {useHistory} from "react-router-dom";

export const Login = () => {
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const setNome = (event) => {
        setUsername(event.target.value)
    }

    const setPass = (event) => {
        setPassword(event.target.value)
    }

    const sendLogin = async () => {
        const response = await login(username, password)

        if (response.status === 200) {
            const access_token = response.headers.get("access_token")
            const refresh_token = response.headers.get("refresh_token")

            window.localStorage.setItem("access_token", access_token)
            window.localStorage.setItem("refresh_token", refresh_token)

            history.push("/game")
        } else {
            console.log('usuário ou senha inválido')
        }
    }
    return (
        <Container>
            <label>
                <span>username:</span>
                <input onChange={setNome} type='text' placeholder="your username" value={username}/>
            </label>
            <label>
                <span>password:</span>
                <input onChange={setPass} type='password' placeholder="your password" value={password}/>
            </label>
            <button onClick={sendLogin}>let's go to battle</button>
            <SubContainer>
                <p>Don't have an account yet? <a onClick={() => history.push("/signup")}>Click here</a></p>
            </SubContainer>
        </Container>
    )
}

const Container = styled.div`
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

const SubContainer = styled.div`
  & > p {
    font-size: .85em;
    letter-spacing: 1px;
    
    & > a {
      cursor: pointer;
      
      &:hover {
        color: #FF731D;
      }
    }
  }
`