import React, { Component } from "react";
import Slider from "react-slick";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  SliderSectionContainer,
  SliderH1,
  SliderWrapper,
  RectangleCard,
  SliderCard,
  CardIcon,
  CardLink,
  CardText
} from './SliderSectionElements'

import Icon1 from '../../assets/images/Frame-1.svg'
import Icon2 from '../../assets/images/Frame.svg'
import Icon3 from '../../assets/images/Vector.svg'
import Icon4 from '../../assets/images/Mask group.svg'

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


const SliderSection = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div>
      <SliderSectionContainer>
        <RectangleCard>
          <SliderH1>Новости</SliderH1>
          <SliderWrapper>
            <Slider {...settings}>
              <SliderCard>
                <CardIcon src={Icon1}></CardIcon>
                <CardText>Новое! В NeuroWeb появилась новая языковая модель</CardText>
                <a href="#"><CardLink>Узнать больше</CardLink></a>
              </SliderCard>
              <SliderCard>
                <CardIcon src={Icon1}></CardIcon>
                <CardText>Новое! В NeuroWeb появилась новая модель классического ML</CardText>
                <a href="#"><CardLink>Узнать больше</CardLink></a>
              </SliderCard>
              <SliderCard>
                <CardIcon src={Icon1}></CardIcon>
                <CardText>Новое! В NeuroWeb появилась новая модель компютерного зрения</CardText>
                <a href="#"><CardLink>Узнать больше</CardLink></a>
              </SliderCard>
              <SliderCard>
                <CardIcon src={Icon1}></CardIcon>
                <CardText>Новое! В NeuroWeb появился новый метод для продвинутой аналитики</CardText>
                <a href="#"><CardLink>Узнать больше</CardLink></a>
              </SliderCard>
            </Slider>
          </SliderWrapper>
        </RectangleCard>
      </SliderSectionContainer>
    </div>
  )
}

export default SliderSection