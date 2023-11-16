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
} from './CLMLSliderSectionElements'

import CatBoost from '../../assets/images/CatBoost.jpg'
import LightGBM from '../../assets/images/LightGBM.jpg'
import XGBoost from '../../assets/images/XGBoost.jpg'


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


const CLMLSliderSection = ({lightBg, id, imgStart, topLine, lightText, heading, darkText, description1, description2, buttonLabel, img, alt, primary, dark, dark2}) => {

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
      <SliderSectionContainer id="clml-slider">
        <RectangleCard>
          <SliderH1>Классические модели ML</SliderH1>
          <SliderWrapper>
            <Slider {...settings}>
              <SliderItem>
                <Wrapper>
                  <ImgWrapper>
                    <CardIcon src={CatBoost}></CardIcon>
                  </ImgWrapper>
                  <TextWrapper>
                    <SliderH2>CatBoost</SliderH2>
                    <CardText> CatBoost — это алгоритм градиентного бустинга на деревьях решений. Он разработан исследователями и инженерами Яндекса и используется для систем поиска, рекомендаций, личного помощника, беспилотных автомобилей, прогнозирования погоды и многих других задач в Яндексе.</CardText>
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
                    <CardIcon src={XGBoost}></CardIcon>
                  </ImgWrapper>
                  <TextWrapper>
                    <SliderH2>XGBoost</SliderH2>
                    <CardText> XGBoost — это оптимизированная распределенная библиотека градиентного бустинга, разработанная для обеспечения высокой эффективности, гибкости и портативности.XGBoost обеспечивает параллельное повышение уровня дерева, которое позволяет быстро и точно решить многие проблемы обработки данных.</CardText>
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
                    <CardIcon src={LightGBM}></CardIcon>
                  </ImgWrapper>
                  <TextWrapper>
                    <SliderH2>LightGBM</SliderH2>
                    <CardText>LightGBM — это платформа для градиентного бустинг, которая использует древовидные алгоритмы обучения. Он обеспечивает 
поддержку параллельного, распределенного и графического обучения, а также оптимизирован для имплементации на большом объеме данных.</CardText>
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

export default CLMLSliderSection