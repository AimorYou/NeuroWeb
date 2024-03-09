import React, { useState } from "react";
import styled from "styled-components";
import plusIcon from "../../assets/images/plus_icon.png";
import minusIcon from "../../assets/images/minus_icon.png";
import { Fade } from "react-awesome-reveal";
import {
    AccordionSection,
    Container,
    Wrap,
    Dropdown,
    Icon
} from './FAQElements';

const FAQ = ({ data = [
    {
        question: "Что такое NeuroWeb?",
        answer: "NeuroWeb - это универсальная веб-платформа, предназначенная для работы с нейронными сетями и машинным обучением. Она предоставляет ряд инструментов и моделей для таких задач, как компьютерное зрение, обработка естественного языка и классическое машинное обучение.",
    },
    {
        question: "Кому может быть полезен NeuroWeb?",
        answer: "NeuroWeb предназначен для широкого круга пользователей, включая ученых, изучающих данные, энтузиастов искусственного интеллекта, исследователей и всех, кто хочет использовать возможности искусственного интеллекта в своих проектах.",
    },
    {
        question: "Как я могу начать работу с NeuroWeb?",
        answer: "Посетите нашу страницу, чтобы начать свое путешествие в искусственный интеллект. Вы найдете пошаговые инструкции по изучению моделей, созданию проектов и обучению собственного ИИ.",
    },
    {
        question: "Могу ли я импортировать в NeuroWeb свои собственные данные?",
        answer: "Конечно! NeuroWeb позволяет импортировать ваши собственные данные, что упрощает применение ИИ к вашим конкретным проектам и наборам данных.",
    },
    {
        question: "Какие модели доступны в NeuroWeb?",
        answer: "NeuroWeb предлагает широкий спектр моделей, включая модели для компьютерного зрения, обработки естественного языка и классического машинного обучения. Каждая из них предназначена для решения конкретных задач и приложений.",
    },
    {
        question: "Требуются ли знания программирования для использования NeuroWeb?",
        answer: "Хотя некоторое знакомство с Python и концепциями машинного обучения будет полезным, NeuroWeb разработан с учетом удобства для пользователя, что делает его доступным для широкой аудитории.",
    },
    {
        question: "Как я могу визуализировать и анализировать результаты моих ИИ-проектов?",
        answer: "NeuroWeb предоставляет интуитивно понятные инструменты для визуализации данных и анализа эффективности моделей. Это позволит вам получить представление и принять обоснованные решения на основе полученных результатов.",
    },

] }) => {
    const [clicked, setClicked] = useState(false);
  
    const toggle = (index) => {
      if (clicked === index) {
        //if clicked question is already active, then close it
        return setClicked(false);
      }
  
      setClicked(index);
    };
  
    return (
      <AccordionSection clicked={clicked}>
        <Container>
          {data && data.map((item, index) => {
            return (
              <>
                <Wrap onClick={() => toggle(index)} key={index}>
                  <h1>{item.question}</h1>
                  <span>
                    {clicked === index ? (
                      <Icon src={minusIcon} />
                    ) : (
                      <Icon src={plusIcon} />
                    )}
                  </span>
                </Wrap>
                {clicked === index ? (
                  <Fade>
                    <Dropdown>
                      <p>{item.answer}
                      
                      </p> 
                    </Dropdown>
                  </Fade>
                ) : null}
              </>
            );
          })}
        </Container>
      </AccordionSection>
    );
  };

export default FAQ;
