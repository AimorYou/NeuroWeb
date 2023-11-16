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
} from './ForgotPasswordElements';

const ForgotPassword = () => {
  const emailPlaceholder = 'Введи почту';
  return (
    <>
      <Container>
        <FormWrap>
        <Icon>   </Icon>
          <FormContent>
            <Form action='#' id="id_form">
              <FormH1>Восстановление пароля</FormH1>
              <FormInput type='email' placeholder={emailPlaceholder} required />
              <FormLabel>Мы вышлем тебе на почту письмо подтверждение о восстановлении пароля.</FormLabel>
              <FormButton type='submit '>Восстановить пароль</FormButton>
            </Form>
          </FormContent>
        </FormWrap>
      </Container >
    </>
  );
};

export default ForgotPassword;
