import React, { useState } from 'react'

import NLP1 from '../../assets/images/NLP-1.png'
import NLP2 from '../../assets/images/NLP-2.png'
import NLP3 from '../../assets/images/NLP-3.png'

import { Button1 } from '../ButtonElements'

import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP,
  RectangleCard,
  ServicesBtnWrapper,
  ArrowForward,
  ArrowRight,
  NameRectangleCard,
  ServicesAd,
  RectangleCardWrapper
} from './CLMLCardSectionElements';

const CLMLCardSection = () => {
  const [hover, setHover] = useState(false)
  const onHover = () => {
    setHover(!hover)
  }
  return (
    <ServicesContainer id="services">

      <RectangleCard>
        <ServicesH1>Области применения</ServicesH1>
      </RectangleCard>
      <ServicesWrapper>
        <ServicesCard className='lowered'>
          <NameRectangleCard>
            <ServicesAd>1. Предсказание и Классификация</ServicesAd>
          </NameRectangleCard>
          <ServicesIcon src={NLP1} />
          <ServicesP>
          Модели Classical ML позволяют предсказывать значения переменных и классифицировать объекты на основе предоставленных данных. Это применяется в аналитике, маркетинге и других областях.
          </ServicesP>
        </ServicesCard>
        <ServicesCard >
          <NameRectangleCard >
            <ServicesAd>2. Продвинутая Аналитика по Таблицам</ServicesAd>
          </NameRectangleCard>
          <ServicesIcon src={NLP2} />
          <ServicesP>
          Модели позволяют проводить сложные анализы данных, включая выявление зависимостей, кластеризацию и оптимизацию.
          </ServicesP>
        </ServicesCard>
        <ServicesCard className='lowered'>
          <NameRectangleCard >
            <ServicesAd>3. Рекомендательные Системы</ServicesAd>
          </NameRectangleCard>
          <ServicesIcon src={NLP3} />
          <ServicesP>
          Classical ML может использоваться для построения рекомендательных систем, которые анализируют предпочтения и поведение пользователей, предлагая им персонализированные рекомендации продуктов.
          </ServicesP>
        </ServicesCard>
      </ServicesWrapper>
      <ServicesBtnWrapper>
        <Button1 to='/signup' onMouseEnter={onHover} onMouseLeave={onHover}>
          Попробовать {hover ? <ArrowForward /> : <ArrowRight
          />}
        </Button1>
      </ServicesBtnWrapper>


    </ServicesContainer>
  )
}

export default CLMLCardSection;