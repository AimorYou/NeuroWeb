import styled from 'styled-components'
import { MdKeyboardArrowRight, MdArrowForward} from 'react-icons/md';

export const ServicesContainer = styled.div`
    height: 800px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #101021;

    @media screen and (max-width: 768px) {
        height: 1100px;
    }

    @media screen and (max-width: 480px) {
        height: 1300px;
    }
`

export const ServicesWrapper = styled.div`
    padding-top: 100px;
    max-height: 500px;
    z-index: 1;
    max-width: 1000px;
    margin: 0 auto;
    margin-top: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    grid-gap: 60px;
    position: relative;

    @media screen and (max-width: 1000px) {
        grid-template-columns: 1fr 1fr;
        padding-top: 100px;
    }
    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
        padding: 0 20px;
    }
`

export const RectangleCardWrapper = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    grid-gap: 60px;
    position: relative;

    @media screen and (max-width: 1000px) {
        grid-template-columns: 1fr 1fr;
    }
    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
        padding: 0 20px;
    }
`

export const ServicesCard = styled.div`
    background: #383847;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;

    height: 400px;
    width: 300px;
   
    box-shadow: 0 1px 3px rgba (0, 0, 0,0.2);
    transition: all 0.2s ease-in-out;

    @media screen and (max-width: 480px) {
        height: 150px;
        width: 150px;
    }

    @media screen and (max-width: 1000px) {
        height: 200px;
        width: 200px;
    }

    &:hover {
        transform: scale(1.02);
        transition: all 0.2s ease-in-out;
        cursor: pointer;
    }
`

export const ServicesIcon = styled.img`
    height: 120px;
    width: 120px;
`
export const ServicesH1 = styled.h1`
    font-size: 2rem;
    color: #fff;
    margin-bottom: 64px;

    @media screen and (max-width: 480px) {
        font-size: 1.5rem;
    }
    @media screen and (max-width: 376px) {
        font-size: 1rem;
    }
`

export const ServicesH2 = styled.h2`
    font-size: 1rem;
    color: #BEC1C6;
    margin-bottom: 10px;
`

export const ServicesAd = styled.h2`
    font-size: 0.9rem;
    color: #fff;

    @media screen and (max-width: 1000px) {
        
        font-size: 0.8rem;
    }
`

export const ServicesP = styled.p`
    max-width: 240px;
    padding-top: 10px;
    color: #fff;
    font-size: 1rem;
    text-align: left;
`

export const RectangleCard = styled.div`
    background-color: rgba(217, 217, 217, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
    border-radius: 32px;
    height: 700px;
    width: 700px;
    padding: 30px;
    box-shadow: 0 1px 3px rgba (0, 0, 0,0.2);

    @media screen and (max-width: 480px) {
        height: 1200;
        width: 460;
    }
`

export const NameRectangleCard = styled.div`
    background: linear-gradient(#5D48B9, #666AED);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    position: absolute;
    height: 40px;
    width: 230px;
    transform: rotate(-9deg);
    box-shadow: 0 1px 3px rgba (0, 0, 0,0.2);
    margin-bottom: 385px;
    margin-right: 115px;

    @media screen and (max-width: 480px) {
       display: none;
    }

    @media screen and (max-width: 1000px) {
        margin-bottom: 230px;
        width: 200px;

    }

    &:hover {
        cursor: pointer;
    }
`

export const ArrowForward = styled (MdArrowForward)`
margin-left: 8px;
font-size: 20px;
`

export const ArrowRight = styled (MdKeyboardArrowRight)`
margin-left: 8px;
font-size: 20px;
`
export const ServicesBtnWrapper = styled.div`
margin-top: 80px;
display: flex;
flex-direction: column;
align-items: center;
z-index: 1;

@media screen and (max-width: 1000px) {
}
`