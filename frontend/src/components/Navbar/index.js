import React, { useState, useEffect } from 'react'
import { FaBars } from 'react-icons/fa'
import Logo from '../../assets/images/Logo.png';
import User from '../../assets/images/User.png';
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavItem,
  NavMenu,
  NavLinks,
  MobileIcon,
  NavBtn,
  NavBtnLink,
  LogoImg,
  UserImg
} from './NavbarElements'

const Navbar = ({ toggle }) => {
  const [scrollNav, setScrollNav] = useState(false)

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true)
    } else {
      setScrollNav(false)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', changeNav)
  }, [])

// Продумать что делать при нажатии на лого, чтобы ехало вверх смотреть с 3:26:00

  return (
    <>
      <Nav scrollNav={scrollNav}>
        <NavbarContainer>
          <NavLogo to='/'>
            <LogoImg src={Logo} />
            NeuroWeb
          </NavLogo>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks to='/'>
                Главная
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to='/getstarted'>
                Начать
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to='/faq'>
                FAQ
              </NavLinks>
            </NavItem>
          </NavMenu>
          <NavBtn>
            <NavBtnLink to='/signin'><UserImg src={User} /></NavBtnLink>
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  )
}

export default Navbar