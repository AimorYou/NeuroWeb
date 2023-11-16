import styled from "styled-components";
import { Link } from "react-router-dom";
import { Link as LinkR } from "react-router-dom"

export const Container = styled.div`
  min-height: 692px;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 0;
  overflow: hidden;
  background: #101021;
  /* background: linear-gradient(
    108deg,
    rgba(1, 147, 86, 1) 0%,
    rgba(10, 201, 122, 1) 100%
  ); */
`;

export const FormWrap = styled.div`
  background: #101021;
  height: 100%; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media screen and (max-width: 400px) {
    height: 80%;
  }
`;

export const Icon = styled(Link)`
  margin-left: 32px;
  margin-top: 32px;
  text-decoration: none;
  color: #fff;
  font-weight: 700;
  font-size: 32px;

  @media screen and (max-width: 480px) {
    margin-left: 16px;
    margin-top: 8px;
  }
`;

export const FormContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 480px) {
    padding: 10px;
  }
`;

export const Form = styled.form`
  background: rgba(217, 217, 217, 0.1);
  max-width: 900px;
  height: auto;
  width: 100%;
  z-index: 1;
  display: grid;
  margin: 0 auto;
  padding: 80px 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
  border-radius: 32px;
  justify-content: center;

  @media screen and (max-width: 400px) {
    padding: 32px 32px;
  }
`;

export const FormH1 = styled.h1`
  margin-bottom: 40px;
  color: #fff;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
`
export const FormLabel = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
  color: #fff;
`;

export const FormInput = styled.input`
  width: 400px;
  color: #fff;
  background: #383847;
  padding: 16px 16px;
  margin-bottom: 32px;
  border: none;
  border-radius: 10px;

  @media screen and (max-width: 460px) {
    width: 250px;
  }
`;

export const FormButton = styled.button`
  background: #5D48B9;
  margin: auto;
  width: 250px;
  padding: 10px 0;
  border: none;
  border-radius: 60px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  @media screen and (max-width: 460px) {
    width: 180px;
  }
`;

export const Text = styled(LinkR)`
  text-align: center;
  margin-top: 24px;
  opacity: 0.5;
  margin-bottom: 24px;
  color: #fff;
  font-size: 14px;
`