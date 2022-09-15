import styled from "styled-components";
import { mobile } from "../responsive";
import axios from 'axios';
import {useState} from 'react'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8000/api/register', {
      email,
      password,
      username
    }).then(res => console.log(res.data))
  }

  return (
    <Container>
      <Wrapper>
        <Title>СОЗДАТЬ АККАУНТ</Title>
        <Form onSubmit={handleRegister}>
          {/* <Input placeholder="name" /> */}
          {/* <Input placeholder="last name" /> */}
          <Input placeholder="username" onChange={ e => setUsername(e.target.value) } value={username} />
          <Input placeholder="email" onChange={ e => setEmail(e.target.value) } value={email} />
          <Input placeholder="password" onChange={ e => setPassword(e.target.value) } value={password} />
          <Input placeholder="confirm password" />
          <Button>СОЗДАТЬ</Button>                                         
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
