import React from 'react'
import {
    FooterContainer,
    FooterWrap,
    FooterLinksContainer,
    FooterLinksWrapper,
    FooterLinkItems,
    FooterLinkTitle,
    FooterLink,
    SocialMedia,
    SocialMediaWrap,
    SocialLogo,
    WebsiteRights,
    SocialIcons,
    SocialIconLink
} from './FooterElements';
import { FaFacebook, FaGit, FaTelegram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <FooterContainer>
            <FooterWrap>
                <FooterLinksContainer>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>О нас</FooterLinkTitle>
                            {/* <FooterLink to="/signin">- Блог</FooterLink> */}
                            <FooterLink to="/team">- Команда</FooterLink>
                            <FooterLink to="/signin">- Работа</FooterLink>
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>Поддержка</FooterLinkTitle>
                            <FooterLink to="https://t.me/+S2VLwdHMfSs2ZTAy">- Связь с нами</FooterLink>
                            <FooterLink to="/private_policy">- Политика Приватности</FooterLink>
                            <FooterLink to="/FAQ">- Вопросы и ответы</FooterLink>
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                </FooterLinksContainer>
                <SocialMedia>
                    <SocialMediaWrap>
                        <SocialLogo to='/'>
                            NeuroWeb
                        </SocialLogo>
                        <WebsiteRights>
                            NeuroWeb {new Date().getFullYear()}
                            <> </>All rights reserved
                        </WebsiteRights>
                        <SocialIcons>
                            <SocialIconLink href='https://t.me/+S2VLwdHMfSs2ZTAy' target='_blank' arial-label='Telegram'>
                                <FaTelegram />
                            </SocialIconLink>
                            <SocialIconLink href='https://github.com/AimorYou/NeuroWeb' target='_blank' arial-label='GitHub'>
                                <FaGit />
                            </SocialIconLink>
                            <SocialIconLink href='https://www.youtube.com/' target='_blank' arial-label='Youtube'>
                                <FaYoutube />
                            </SocialIconLink>
                        </SocialIcons>
                    </SocialMediaWrap>
                </SocialMedia>
            </FooterWrap>
        </FooterContainer>
    )
}

export default Footer