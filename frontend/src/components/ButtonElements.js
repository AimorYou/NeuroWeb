import styled from 'styled-components';

import { Link as LinkS } from 'react-scroll';

import { Link as LinkR } from "react-router-dom"

export const Button1 = styled (LinkR)`
    border-radius: 50px;
    background: linear-gradient(#5D48B9, #666AED);  ${({ primary }) => (primary ? '#01BF71' : '#010606')};
    white-space: nowrap;
    padding: ${({ big }) => (big ? '14px 48px' : '12px 30px' )};
    color: ${({ dark }) => (dark ? '#010606' : '#fff')};
    font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')} ;
    text-decoration: none;
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    

    &:hover {
        transition: all 0.2s ease-in-out;
        background: linear-gradient(#5D48B9, #666AED);  ${({ primary }) => (primary ? '#01BF71' : '#010606')};
    } 
`

export const Button2 = styled (LinkS)`
    border-radius: 50px;
    background: #D9D9D9;
    white-space: nowrap;
    padding: ${({ big }) => (big ? '12px 32px' : '12px 32px' )};
    color: ${({ dark }) => (dark ? '#010606' : '#fff')};
    font-size: ${({ fontBig }) => (fontBig ? '16px' : '16px')} ;
    text-decoration: none;
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    display: ${({ display }) => (!display ? "none": "auto")} ;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: ${({ primary }) => (primary ? '#D9D9D9' : '#01BF71' )};
    } 
`