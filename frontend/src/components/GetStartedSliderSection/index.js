import React, { Component, useState } from "react";
import Slider from "react-slick";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button1 } from "../ButtonElements";
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
} from './SliderSectionElements'

import NLP from '../../assets/images/NLP.svg'
import CV from '../../assets/images/CV.svg'
import CLML from '../../assets/images/ClML.svg'


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


const GetStartedSliderSection = ({lightBg, id, imgStart, topLine, lightText, heading, darkText, description1, description2, buttonLabel, img, alt, primary, dark, dark2}) => {

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
      <SliderSectionContainer id={"get-started-slider"}>
        <RectangleCard>
          <SliderH1>Области машинного обучения</SliderH1>
          <SliderWrapper>
            <Slider {...settings}>
              <SliderItem>
                <Wrapper>
                  <ImgWrapper>
                    <CardIcon src={NLP}></CardIcon>
                  </ImgWrapper>
                  <TextWrapper>
                    <SliderH2>NLP</SliderH2>
                    <CardText>Дай своим данным голос с помощью мощного модуля обработки естественного языка. </CardText>
                    <CardText>Наша платформа позволяет тебе распознавать звуки, а также создавать синтезированную речь.</CardText>
                    <CardText>Загрузи аудиофайлы для анализа и обработки, обучи модель и проверь ее работоспособность в режиме предпросмотра.</CardText>
                  </TextWrapper>
                  <BtnWrap>
                  <Button2 to='/nlp'
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
                    <CardIcon src={CV}></CardIcon>
                  </ImgWrapper>
                  <TextWrapper>
                    <SliderH2>Компьютерное зрение</SliderH2>
                    <CardText>Исследуй мир через глаза искусственного интеллекта с помощью компьютерного зрения. </CardText>
                    <CardText>От классификации изображений до распознавания лиц и поз — NeuroWeb дает тебе возможность проводить сложные анализы визуальных данных.</CardText>
                    <CardText>Загрузи свои изображения, обучи модель и проверь ее работоспособность в режиме предпросмотра.</CardText>
                  </TextWrapper>
                  <BtnWrap>
                    <Button2 to='/CV'
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
                    <CardIcon src={CLML}></CardIcon>
                  </ImgWrapper>
                  <TextWrapper>
                    <SliderH2>Классическое ML</SliderH2>
                    <CardText>Используй мощные алгоритмы классического машинного обучения для предсказания значений в твоей таблице данных.</CardText>
                    <CardText>Проводи продвинутый анализ данных и визуализацию метрик для более глубокого понимания ваших данных. </CardText>
                    <CardText>Загрузи свои данные, обучи модель и проверь ее работоспособность в режиме предпросмотра.</CardText>
                  </TextWrapper>
                  <BtnWrap>
                  <Button2 to='/clml'
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

export default GetStartedSliderSection