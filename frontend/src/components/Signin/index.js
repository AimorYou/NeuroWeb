import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import {
  Container,
  FormWrap,
  Icon,
  FormContent,
  Form,
  FormH1,
  FormInput,
  FormButton,
  Text
} from './SigninElements';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://0.0.0.0:8888/api/token', {
        grant_type: 'password',
        username: email,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (response.status === 200) {
        setUser({ email });
        navigate('/');
      } else {
        setError('Ошибка входа. Проверьте почту и пароль.');
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setError('Некорректные данные. Пожалуйста, проверьте введенные данные.');
      } else {
        setError('Ошибка входа. Попробуйте позже.');
      }
      console.error('Ошибка входа:', error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Container>
      <FormWrap>
        <Icon />
        <FormContent>
          <Form onSubmit={handleSubmit} id="id_form">
            <FormH1>Вход</FormH1>
            <FormInput type='email' placeholder='Введи почту' value={email} onChange={handleEmailChange} required />
            <FormInput type='password' placeholder='Введи пароль' value={password} onChange={handlePasswordChange} required />
            {error && <p style={{ color: 'white' }}>{error}</p>}
            <FormButton type='submit'>Продолжить</FormButton>
            <Text to='/restore_password'>Забыл пароль?</Text>
            <a href='/register' className='test'><FormButton type='button'> Регистрация</FormButton></a>
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
};

export default SignIn;
