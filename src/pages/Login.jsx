import styled from "styled-components";
import {mobile} from "../responsive";
import {useState, useContext} from 'react';
import axios from 'axios';
import { loginSuccess } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/3968061/pexels-photo-3968061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/login', {
      email,
      password
    }).then(res => {
      dispatch(loginSuccess(res.data))
    })
  }

  // const handleLoginAsyncAwait = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const userData = await axios.post('http://localhost:8000/api/login', {
  //       email,
  //       password
  //     })
  //     dispatch({type : "LOGIN_SUCCESS", payload : res.data})
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  return (
    <Container>
      <Wrapper>
        <Title>ВОЙТИ</Title>
        <Form onSubmit={handleLogin}>
          <Input placeholder="email" onChange={e => setEmail(e.target.value)} value={email}/>
          <Input placeholder="password" onChange={e => setPassword(e.target.value)} value={password} />
          <Button>ЛОГИН</Button>
          <Link>ЗАБЫЛИ ПАРОЛЬ?</Link>
          <Link>СОЗДАТЬ НОВЫЙ АККАУНТ</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
