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
} from './CVCardSectionElements';

const CVCardSection = () => {
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
        <ServicesCard >
          <NameRectangleCard>
            <ServicesAd>1. Распознавание и Классификация Объектов</ServicesAd>
          </NameRectangleCard>
          <ServicesIcon src={NLP1} />
          <ServicesP>
            Модели CV могут автоматически распознавать объекты и классифицировать их на изображениях.
          </ServicesP>
        </ServicesCard>
        <ServicesCard className='lowered'>
          <NameRectangleCard >
            <ServicesAd>2. Распознавание Лиц и Поз</ServicesAd>
          </NameRectangleCard>
          <ServicesIcon src={NLP2} />
          <ServicesP>
            Блок CV позволяет выявлять и анализировать лица, а также распознавать позы человека. Это может быть полезным в системах видеонаблюдения и разработке приложений виртуальной реальности.
          </ServicesP>
        </ServicesCard>
        <ServicesCard >
          <NameRectangleCard >
            <ServicesAd>3. Анализ Качества Изображений</ServicesAd>
          </NameRectangleCard>
          <ServicesIcon src={NLP3} />
          <ServicesP>
            Модели могут оценивать качество изображений, выявлять дефекты и предоставлять рекомендации по улучшению.
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

export default CVCardSection;