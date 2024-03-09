import React, { useState } from "react";
import styled from "styled-components";
import plusIcon from "../../assets/images/plus_icon.png";
import minusIcon from "../../assets/images/minus_icon.png";
import { Fade } from "react-awesome-reveal";

const maxWidth = `900px`;

export const AccordionSection = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  height: 850px;
  ${(props) => {
    if (props.clicked !== false) {
      return `
      height: 1020px;
      transition: height 0.1s ease-out;
      `;
    }
  }}
  @media (min-width: 768px) {
    height: 600px;
    ${(props) => {
      if (props.clicked !== false) {
        return `
        height: 700px;
        transition: height 0.1s ease-out;
        `;
      }
    }}
  }
`;

export const Container = styled.div`
  margin-top: 2rem;
  position: absolute;
  border-top: 1px solid #666AED;
  overflow: hidden;
  width: 95%;
  @media (min-width: 992px) {
    width: ${maxWidth};
    max-width: ${maxWidth};
  }
`;

export const Wrap = styled.div`
  background: #101021;
  color: #fff;
  border-bottom: 1px solid #666AED;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: left;
  cursor: pointer;
  h1 {
    padding: 1.8rem;
    font-size: 1.2rem;
    color: #fff;
    margin-bottom: 0;
  }
  span {
    margin-right: 1.5rem;
  }
`;

export const Dropdown = styled.div`
  background: #101021;
  color: #fff;
  width: 100%;
  height: auto;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  padding: 0 2rem;
  border-bottom: 1px solid #666AED;
  border-top: 1px solid #666AED;
  p {
    font-size: 1.2rem;
    padding: 1rem 0;
  }
`;

export const Icon = styled.img`
  width: 20px;
  height: 20px;
`;
