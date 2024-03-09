import styled from 'styled-components';
import { Link as LinkR } from "react-router-dom"

export const Container = styled.div`
  padding: 80px 60px;
  background: #101021;
  align-items: center;

  @media (max-width: 1000px) {
    padding: 70px 30px;
  }
`;

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

export const LogoImg = styled.img`
  height: 50px;
  padding-right: 10px;
`

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1200px;
    margin: 0 auto;
    /* background: red; */
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 60px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(230px, 1fr));
  grid-gap: 20px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

export const Row2 = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  grid-gap: 30px;
  padding-top: 40px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(20px, 1fr));
  }
`;

export const Link = styled.a`
  color: #fff;
  margin-bottom: 20px;
  font-size: 18px;
  text-decoration: none;

  &:hover {
      color: #666AED;
      transition: 200ms ease-in;
  }
`;

export const Link2 = styled.a`
  color: #fff;
  margin-bottom: 20px;
  font-size: 30px;
  text-decoration: none;

  &:hover {
      color: #666AED;
      transition: 200ms ease-in;
  }
`;

export const Title = styled.p`
  font-size: 24px;
  color: #fff;
  margin-bottom: 40px;
  font-weight: bold;
`;

export const Text = styled.p`
  font-size: 14px;
  color: #fff;
  margin-bottom: 40px;
  font-weight: lighter;
  justify-content: center;
  text-align: center;
  padding-top: 40px;
`;