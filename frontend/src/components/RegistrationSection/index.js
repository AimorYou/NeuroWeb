import React, {useState, useContext} from 'react'
import { useNavigate } from "react-router-dom";
import {
  Container,
  FormWrap,
  Icon,
  FormContent,
  Form,
  FormH1,
  FormLabel,
  FormInput,
  FormButton,
  Text
} from './RegistrationElements';

import {UserContext} from '../../context/UserContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [, setToken] = useContext(UserContext);
  const navigate = useNavigate();
  const submitRegistration = async () => {
    try {
    console.log("Clicked")
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    const requestOptions = new Request("http://0.0.0.0:8888/api/signup", {
      method: "POST",
      // headers: {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "(GET, POST, PUT, DELETE, PATCH, OPTIONS)"},
      body: formData,
    });

    console.log(requestOptions)

    const response = await fetch(requestOptions)
    const data = await response.json()

    console.log(response)
    console.log(response.ok)
    if (!response.ok) {
      setErrorMessage(data.detail);
    } else {
      setToken(data.access_token)
    }
    }
    catch (err) {
      console.log(err)
      navigate("/");
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clo¥ikked")
    if (password === confirmationPassword && password.length > 4) {
      console.log("good")
      submitRegistration();
    } else {
      console.log("not good")
      setErrorMessage("Ensure that the passwords match and greater than 5 characters");
    }
  };

  const emailPlaceholder = 'Введите почту';
  const passwordPlaceholder = 'Введите пароль';
  const passwordConfPlaceholder = 'Подтвердите пароль';

  return (
    <>
      <Container>
        <FormWrap>
          <FormContent>
            <Form onSubmit={handleSubmit}>
              <FormH1>Регистрация</FormH1>
              <FormInput type='email'
              placeholder={emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required/>
              <FormInput type='password'
              placeholder={passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
              <FormInput type='password'
              placeholder={passwordConfPlaceholder}
              value={confirmationPassword}
              onChange={(e) => setConfirmationPassword(e.target.value)}
              required />
              <FormButton type='submit'>Продолжить</FormButton>
            </Form>
          </FormContent>
        </FormWrap>
      </Container >
    </>
  );
};

export default Register;
