import styled from "styled-components"
import { Link as LinkR } from "react-router-dom"
import { Link as LinkS } from "react-scroll"


export const Nav = styled.nav`
  background: ${({scrollNav}) => (scrollNav ? '#101021': '#101021')};
  height: 80px;
  /* margin-top: -80px; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  
  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  max-width: 1300px;
`

export const NavLogo = styled(LinkR)`
  color: #666AED;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5em;
  display: flex;
  align-items: center;

  font-weight: bold;
  text-decoration: none;
`;


export const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8 rem;
    cursor: pointer;
    color: #fff;
  }
  
`


export const NavMenu = styled.ul`
  border-radius: 30px; 
  /* background-color: #D9D9D9; */
  background-color: rgba(217, 217, 217, 0.2);
  height: 60%;
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
  border: none;
  align-items: center;
  list-style: none;
  text-align: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`
export const NavItem = styled.li`
  height: 100%;
  transition: background 0.2s ease-in-out;

  &:hover {
    border-radius: 30px; 
    background: linear-gradient(#5D48B9, #666AED);
  }
`
export const NavLinks = styled(LinkR)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 2.8rem;
  height: 100%;
  cursor: pointer;

  &.active {
    border-bottom: 3px solid #01bf71;
  }
`

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-top: auto;
  margin-bottom: auto;
  border-radius: 1200px;
  height: 60%;
  background: linear-gradient(#5D48B9, #666AED);
  @media screen and (max-width: 768px) {
    display: none;
  }
  
`

export const NavBtnLink = styled(LinkR) `
  padding: 11px 14px;
  color: #010606;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #666AED;
    color: #010606;
    border-radius: 1200px;
  }
`
export const LogoImg = styled.img`
  height: 50px;
  padding-right: 10px;
`
export const UserImg = styled.img`
  height: 25px;
`