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
} from './RegistrationElements';

const Register = () => {
  const emailPlaceholder = 'Введи почту';
  const passwordPlaceholder = 'Введи пароль';
  const password2Placeholder = 'Повтори пароль';
  return (
    <>
      <Container>
        <FormWrap>
        <Icon>   </Icon>
          <FormContent>
            <Form action='#'>
              <FormH1>Регистрация</FormH1>
              <FormInput type='email' placeholder={emailPlaceholder} required />
              <FormInput type='password' placeholder={passwordPlaceholder} required />
              <FormInput type='password' placeholder={password2Placeholder} required />
              <FormButton type='submit'>Продолжить</FormButton>
            </Form>
          </FormContent>
        </FormWrap>
      </Container >
    </>
  );
};

export default Register;
