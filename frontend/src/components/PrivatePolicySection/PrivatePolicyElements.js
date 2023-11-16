import styled from 'styled-components'

export const ServicesContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #101021;
    max-width: max-content;

    padding-left: 10%;
    padding-right: 10%;
    padding-top: 2%;

   
    `

export const ServicesH1 = styled.h1`
    font-size: 1.4rem;
    color: #fff;

    @media screen and (max-width: 480px) {
        font-size: 1.2rem;
    }
    @media screen and (max-width: 376px) {
        font-size: 1rem;
    }
`

export const ServicesH2 = styled.p`
    font-size: 1rem;
    color: #fff;
    margin-bottom: 20px;
`