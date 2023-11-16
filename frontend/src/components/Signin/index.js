import React from 'react'
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
} from './SigninElements';

const SignIn = () => {
  const emailPlaceholder = 'Введи почту';
  const passwordPlaceholder = 'Введи пароль';
  return (
    <>
      <Container>
        <FormWrap>
        <Icon>   </Icon>
          <FormContent>
            <Form action='#' id="id_form">
              <FormH1>Вход</FormH1>
              <FormInput type='email' placeholder={emailPlaceholder} required />
              <FormInput type='password' placeholder={passwordPlaceholder} required />
              <FormButton type='submit '>Продолжить</FormButton>
              <Text to='/restore_password'>Забыл пароль?</Text>
              <a href='/register' className='test'><FormButton type='button'> Регистрация</FormButton></a>
            </Form>
          </FormContent>
        </FormWrap>
      </Container >
    </>
  );
};

export default SignIn;
