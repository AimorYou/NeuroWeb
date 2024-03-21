import React, {useState, useContext} from 'react'
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
 
  const submitRegistration = async () => {
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email: email, hashed_password: password}),
    };

    const response = await fetch("http://0.0.0.0:8888/api/v1/users", requestOptions)
    const data = await response.json()

    if (!response.ok) {
      setErrorMessage(data.detail);
    } else {
      setToken(data.access_token)
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmationPassword && password.length > 5) {
    submitRegistration();
    } else {
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
            <Form action={handleSubmit}>
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
