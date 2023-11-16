import styled from 'styled-components'
import { MdKeyboardArrowRight, MdArrowForward} from 'react-icons/md';

export const InfoContainer = styled.div`
    color: #fff;
    background: ${({ lightBg }) => (lightBg ? '#f9f9f9' : '#101021')};

    height: 800px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 768px) {
        height: 1100px;
    }

    @media screen and (max-width: 480px) {
        height: 1300px;
    }

  
`;

export const InfoWrapper = styled.div`
    display: grid;
    z-index: 1;
    height: 860px;
    width: 100%;
    max-width: 1100px;
    margin-right: auto;
    margin-left: auto;
    padding: 0 24px;
    justify-content: center;
`;

export const InfoRow = styled.div`
    display: grid;
    grid-auto-columns: minmax(auto, 1fr);
    align-items: center;
    grid-template-areas: ${({imgStart}) => (imgStart ? `'col2 col1'` : `'col1 col2'`)};
@media screen and (max-width: 768px) {
    grid-template-areas: ${({imgStart}) => (imgStart ? `'col1' 'col2'`: `'col1 col1' 'col2 col2'`)}
}
`
export const Column1 = styled.div`
    margin-bottom: 15px;
    padding: 0 15px;
    grid-area: col1;
`
export const Column2 = styled.div`
    margin-bottom: 15px;
    padding: 0 15px;
    grid-area: col2;
`

export const TextWrapper = styled.div`
    max-width: 540px;
    padding-top: 0;
    padding-bottom: 60px;   
`

export const TopLine = styled.p`
    color: #fff;
    font-size: 22px;
    line-height: 16px;
    font-weight: 700;
    letter-spacing: 1.4px;
    margin-bottom: 16px;
`

export const Heading = styled.h1`
font-size: 2rem;
margin-bottom: 40px;
line-height: 1.1;
font-weight: 600;
color: ${({ lightText }) => (lightText ? '#f7f8fa' : '#010606')};
@media screen and (max-width: 480px) {
    font-size: 32px;
}
`
export const Subtitle = styled.p`
max-width: 440px;
margin-bottom: 35px;
font-size: 18px;
line-height: 24px;
color: ${({darkText}) => (darkText ? '#010606' : "#fff")}
`

export const BtnWrap = styled.div`
display: flex;
justify-content: flex-start;
`
export const ImgWrap = styled.div`
    max-width: 400px;
    height: 100%;
`

export const Img = styled.img `
    width: 100%;
    margin: 0 0 10px 0;
    padding-right: 0;
    border-radius: 25px;
`

export const ServicesCard = styled.div`
    background: ${({darkBg}) => (darkBg ? "linear-gradient(-135deg, #020416, #2D333E)": "linear-gradient(90deg, rgb(97, 45, 202) 0%, rgb(156, 131, 236) 100%)")};
    border: 1px solid #454A54;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 32px;
    height: 600px;
    padding: 30px;
    box-shadow: 0 1px 3px rgba (0, 0, 0,0.2);
    transition: all 0.2s ease-in-out;

    @media screen and (max-width: 480px) {
    height: 1000px;
    }

    @media screen and (max-width: 768px) {
        height: 900px;
    }

    @media screen and (max-width: 373px) {
        height: 1050px;
    }

    @media screen and (max-width: 490px) {
        height: 1000px;
    }
    

    &:hover {
        transform: scale(1.02);
        transition: all 0.2s ease-in-out;
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