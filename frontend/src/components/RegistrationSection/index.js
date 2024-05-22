import React, {useState, useContext} from 'react'
import { useNavigate } from "react-router-dom";
import { useUser } from '../../context/UserContext';
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



const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser } = useUser();

  const navigate = useNavigate();
  const submitRegistration = async (e) => {
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
      setUser({ email });
      navigate("/");
    }
    }
    catch (err) {
      console.log(err)
      
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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfPasswordChange = (e) => {
    setConfirmationPassword(e.target.value);
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
              onChange={handleEmailChange}
              required/>
              <FormInput type='password'
              placeholder={passwordPlaceholder}
              value={password}
              onChange={handlePasswordChange}
              required />
              <FormInput type='password'
              placeholder={passwordConfPlaceholder}
              value={confirmationPassword}
              onChange={handleConfPasswordChange}
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
