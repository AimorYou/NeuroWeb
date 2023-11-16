import React, { Component, useState } from "react";
import Slider from "react-slick";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  SliderSectionContainer,
  SliderH1,
  SliderH2,
  SliderWrapper,
  RectangleCard,
  SliderItem,
  CardIcon,
  CardLink,
  CardText,
  ImgWrapper,
  TextWrapper,
  Wrapper,
  BtnWrap,
  Button2
} from './NLPSliderSectionElements'

import Model1 from '../../assets/images/Model1.jpg'
import Model2 from '../../assets/images/Model2.jpg'
import Faces from '../../assets/images/face-recognition.jpeg'


// import { Button2 } from '../ButtonElements'

import { ArrowForward } from "@mui/icons-material";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    // <div
    //   className={className}
    //   style={{ ...style, display: "block", background: "red" }}
    //   onClick={onClick}
    // >
    //   <FiArrowRight/>{" "}
    // </div>
    <ArrowForwardIosIcon className={className} onClick={onClick} style={{ ...style, display: "block", color: "fff" }} />

  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    // <div
    //   className={className}
    //   style={{ ...style, display: "block", background: "green" }}
    //   onClick={onClick}
    // />
    <ArrowBackIosNewIcon className={className} onClick={onClick} style={{ ...style, display: "block", color: "fff" }} />
  );
}


const NLPSliderSection = ({ lightBg, id, imgStart, topLine, lightText, heading, darkText, description1, description2, buttonLabel, img, alt, primary, dark, dark2 }) => {

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const [hover, setHover] = useState(false)
  const onHover = () => {
    setHover(!hover)
  }

  return (
    <div>
      <SliderSectionContainer id={"nlp-slider"}>
        <RectangleCard>
          <SliderH1>Модели NLP</SliderH1>
          <SliderWrapper>
            <Slider {...settings}>
              <SliderItem>
                <Wrapper>
                  <ImgWrapper>
                    <CardIcon src={Model1}></CardIcon>
                  </ImgWrapper>
                  <TextWrapper>
                    <SliderH2>Классификация звуков</SliderH2>
                    <CardText>Модель принимает на вход векторные представления n предыдущих слов и может «понимать» семантику предложения. </CardText>
                  </TextWrapper>
                  <BtnWrap>
                    <Button2 to='/classes'
                      onMouseEnter={onHover} onMouseLeave={onHover}
                      smooth={true}
                      duration={500}
                      spy={true}
                      exact="true"
                      offset={-80}
                      primary={primary ? 1 : 0}
                      dark={dark ? 1 : 0}
                      dark2={dark2 ? 1 : 0}
                    >
                      Попробовать{buttonLabel}{<ArrowForward />}</Button2>
                  </BtnWrap>
                </Wrapper>



              </SliderItem>
              <SliderItem>
                <Wrapper>
                  <ImgWrapper>
                    <CardIcon src={Model2}></CardIcon>
                  </ImgWrapper>
                  <TextWrapper>
                    <SliderH2>Классификация текстов</SliderH2>
                    <CardText>Исследуй мир через глаза искусственного интеллекта с помощью компьютерного зрения. </CardText>
                  </TextWrapper>
                  <BtnWrap>
                    <Button2 to='/classes'
                      onMouseEnter={onHover} onMouseLeave={onHover}
                      smooth={true}
                      duration={500}
                      spy={true}
                      exact="true"
                      offset={-80}
                      primary={primary ? 1 : 0}
                      dark={dark ? 1 : 0}
                      dark2={dark2 ? 1 : 0}
                    >
                      Попробовать{buttonLabel}{<ArrowForward />}</Button2>
                  </BtnWrap>
                </Wrapper>



              </SliderItem>

            </Slider>
          </SliderWrapper>
        </RectangleCard>
      </SliderSectionContainer>
    </div>
  )
}

export default NLPSliderSection