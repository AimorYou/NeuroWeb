import styled from 'styled-components'
import { MdKeyboardArrowRight, MdArrowForward} from 'react-icons/md';
import { Link as LinkR } from 'react-router-dom';

export const SliderSectionContainer = styled.div`
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

export const SliderWrapper = styled.div`
    /* padding-top: 100px;
    padding-right: 1080px; */
    max-height: 600px;
    /* z-index: 1; */
    /* max-width: 1000px; */
    width: 100%;
    /* display: flex; */
    align-items: center;
    justify-content: center;
    /* position: relative; */

`


export const SliderItem = styled.div`  // TODO: Можно попробовать по grid раскидать
    /* position: relative; */
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    margin: auto;
    /* max-width: 800px;
    max-height: 1000px; */

   
    box-shadow: 0 1px 3px rgba (0, 0, 0,0.2);
    transition: all 0.2s ease-in-out;

    @media screen and (max-width: 480px) {

    }

    @media screen and (max-width: 1000px) {

    }


`

export const CardIcon = styled.img`
    /* height: 300px; */
    width: 400px;
    display: inline-block;
    margin-right: 60px;
    margin-left: 60px;
    margin-top: 30px;

    @media screen and (max-width: 480px) {
        /* height: 300px; */
        width: 200px;
}

@media screen and (max-width: 1000px) {
    width: 300px;
}
    

`
export const SliderH1 = styled.h1`
    font-size: 2rem;
    color: #fff;
    margin-bottom: 30px;


    @media screen and (max-width: 480px) {
        font-size: 1.5rem;
    }
    @media screen and (max-width: 376px) {
        font-size: 1rem;
    }
`


export const CardLink = styled.h2`
    font-size: 1rem;
    text-decoration: underline;
    color: #fff;
    padding: 20px;

    @media screen and (max-width: 1000px) {
        
        font-size: 0.8rem;
    }

    @media screen and (max-width: 480px) {
        font-size: 0.6rem;
    }
`

export const CardText = styled.p`

  text-align: left;
  font-size: 18px;
  white-space: pre-line;

  /* justify-items: center; */
  /* align-self: center; */
  color: #fff;
  display: inline;
  /* margin-bottom: 15px; */
  @media screen and (max-width: 1000px) {
        font-size: 14px;
        text-align: center;
    }
    @media screen and (max-width: 480px) {
        font-size: 10px;
    }

`

export const RectangleCard = styled.div` // TODO: Адаптивность подправить 
    background: linear-gradient(90deg, rgb(2, 4, 22) 0%, rgb(45, 51, 62) 100%);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    // position: absolute;
    border-radius: 32px;
    height: 620px;
    /* width: 95%; */
    max-width: 1100px;
    padding: 30px;
    box-shadow: 0 1px 3px rgba (0, 0, 0,0.2);

    @media screen and (max-width: 1100px) {
        width: 95%;
        height: 70%;
    }

    @media screen and (max-width: 480px) {
        width: 95%;

        
    }
`

export const ImgWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

`

export const TextWrapper = styled.div`
    display: grid;
    place-items: center;
    height: 100%;
    grid-template-rows: 0.5fr 1fr;
    justify-items: center;
    text-align: left;
    /* gird-gap: 10px */


`

export const Wrapper = styled.div`
    margin: auto;
    display: inline-grid;
    grid-template-columns: 1fr 1fr;
    /* align-items: center; */
    /* justify-content: center; */
    @media screen and (max-width: 1000px) {
        grid-template-columns: 1fr;
    }

    @media screen and (max-width: 480px) {

        grid-template-columns: 1fr;
    }
    

`

export const BtnWrap = styled.div`
    
    width: 200px;
    margin: auto;
    grid-column: 1/-1;

    @media screen and (max-width: 1000px) {
        width: 150px;
    }
    @media screen and (max-width: 480px) {
        width: 100px;
    }
`

export const SliderH2 = styled.h1`
    margin-top: 30px;
    font-size: 1.8rem;
    /* margin-bottom: 20px; */
    color: #fff;

    @media screen and (max-width: 480px) {
        font-size: 1.3rem;
    }
    @media screen and (max-width: 1000px) {
        font-size: 1rem;
    }
`

export const Button2 = styled(LinkR)`
    margin-top: 20px;
    border-radius: 50px;
    background: #D9D9D9;
    padding: 12px 32px;
    text-decoration: none;
    color: '#010606';
    font-size: 16px ;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;

    &:hover {
        cursor: pointer;
    } 

    @media screen and (max-width: 480px) {
        font-size: 10px;
    }
    @media screen and (max-width: 376px) {
        font-size: 8px;
    }
`