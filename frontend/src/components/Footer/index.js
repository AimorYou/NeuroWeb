import React from 'react'
import Logo from '../../assets/images/Logo.png';
import { FaGit, FaTelegram, FaYoutube } from 'react-icons/fa';
import {
    Container,
    Wrapper,
    Column,
    Row,
    Link,
    Title,
    NavLogo,
    LogoImg,
    Row2,
    Link2,
    Text
  } from './FooterElements'



export function FooterContainer() {
    return (
        <Container>
            <Wrapper>
            <Row>
                <Column>
                    <NavLogo to='/'>
                        <LogoImg src={Logo} />
                        NeuroWeb
                    </NavLogo>
                    <Row2>
                        <Link2 href="#"><FaGit /></Link2>
                        <Link2 href="#"> <FaTelegram /> </Link2>
                        <Link2 href="#"><FaYoutube /></Link2>
                    </Row2>
                </Column>
                <Column>
                <Title>О нас</Title>
                    <Link href="/team">Команда</Link>
                    <Link href="#">Работа</Link>
                </Column>
                <Column>
                <Title>Поддержка</Title>
                    <Link href="#">Связь с нами</Link>
                    <Link href="/private_policy">Политика приватности</Link>
                    <Link href="/faq">Вопросы и ответы</Link>
                </Column>
            </Row>
                <Text>
                    Все права защищены. Команда NeuroWeb. 
                </Text>
            </Wrapper>
            </Container>
    )
}

export default FooterContainer;