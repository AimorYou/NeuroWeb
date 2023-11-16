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
} from './CVSliderSectionElements'

import Poses from '../../assets/images/poses.png'
import Classification from '../../assets/images/classification.png'
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


const CVSliderSection = ({lightBg, id, imgStart, topLine, lightText, heading, darkText, description1, description2, buttonLabel, img, alt, primary, dark, dark2}) => {

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
      <SliderSectionContainer id="cv-slider">
        <RectangleCard>
          <SliderH1>Компьютерное зрение</SliderH1>
          <SliderWrapper>
            <Slider {...settings}>
              <SliderItem>
                <Wrapper>
                  <ImgWrapper>
                    <CardIcon src={Classification}></CardIcon>
                  </ImgWrapper>
                  <TextWrapper>
                    <SliderH2>Классификация изображений</SliderH2>
                    <CardText> Модель классификации изображений в NeuroWeb представляет собой мощный инструмент для автоматического распознавания и категоризации объектов на изображениях. Она обучена анализировать визуальные данные и присваивать им соответствующие метки или классы. </CardText>
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
                    <CardIcon src={Faces}></CardIcon>
                  </ImgWrapper>
                  <TextWrapper>
                    <SliderH2>Распознавание лиц</SliderH2>
                    <CardText> Модель распознавания лиц в NeuroWeb представляет собой инструмент для автоматического анализа и идентификации лиц на изображениях или видео. Эта модель обучена точно определять особенности лица и при необходимости идентифицировать конкретного человека.</CardText>
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
                    <CardIcon src={Poses}></CardIcon>
                  </ImgWrapper>
                  <TextWrapper>
                    <SliderH2>Позы</SliderH2>
                    <CardText>Модель распознавания поз в NeuroWeb представляет собой инструмент для автоматического анализа и интерпретации поз человека на изображениях или видео. Она способна точно определить положение тела и конечностей, что делает её важным инструментом для анализа движений и действий. </CardText>
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

export default CVSliderSection