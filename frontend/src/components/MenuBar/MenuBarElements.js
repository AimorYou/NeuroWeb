import styled from "styled-components"

export const Nav = styled.nav`
  background: #7258E9;
  height: 40px;
  /* margin-top: -80px; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: sticky;
  top: 1;
  z-index: 10;
  
  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`

export const NavbarContainer = styled.div`
  display: flex;
  height: 40px;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
`

export const MenuIcon = styled.div`
  display: none;
    display: block;
    position: absolute;
    top: 0;
    left: 1;
    transform: translate(-100%, 60%);
    font-size: 3 rem;
    cursor: pointer;
    color: #fff;
  `