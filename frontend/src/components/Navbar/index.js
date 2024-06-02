import Logo from '../../assets/images/Logo.png';
import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavIcon,
  MobileIcon,
  NavMenu,
  NavItem,
  NavItemBtn,
  NavLinks,
  NavBtnLink,
  NavUserName
} from './NavbarElements';
import { Button } from '../globalStyles';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const { user, setUser } = useUser();

  const handleLogout = () => {
    setUser(null);
  };

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to='/'>
          <NavIcon src={Logo} />
          NeuroWeb
        </NavLogo>
        <MobileIcon onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </MobileIcon>
        <NavMenu onClick={handleClick} click={click}>
          <NavItem>
            <NavLinks to='/get-started'>Начать</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to='/faq'>Вопросы и ответы</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to='/about'>О нас</NavLinks>
          </NavItem>
          {user ? (
            <>
              <NavItem>
                <NavUserName>{user.email}</NavUserName>
              </NavItem>
              <NavItemBtn>
                <NavBtnLink to='/signin'>
                  <Button primary onClick={handleLogout}>Выйти</Button>
                </NavBtnLink>
              </NavItemBtn>
            </>
          ) : (
            <NavItemBtn>
              {button ? (
                <NavBtnLink to='/signin'>
                  <Button primary>Войти</Button>
                </NavBtnLink>
              ) : (
                <NavBtnLink to='/signin'>
                  <Button fontBig primary>
                    Войти
                  </Button>
                </NavBtnLink>
              )}
            </NavItemBtn>
          )}
        </NavMenu>
      </NavbarContainer>
    </Nav>
  );
};


export default Navbar;