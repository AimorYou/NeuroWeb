import React, { useState } from 'react'

import NLP1 from '../../assets/images/NLP-1.png'
import NLP2 from '../../assets/images/NLP-2.png'
import NLP3 from '../../assets/images/NLP-3.png'

import { Button1, Button2 } from '../ButtonElements'

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
    RectangleCardWrapper,
    Button
} from './NLPCardSectionElements';

const NLPCardSection = () => {
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
                        <ServicesAd>1. Обработка и анализ текстов</ServicesAd>
                    </NameRectangleCard>
                    <ServicesIcon src={NLP1} />
                    <ServicesP>
                    NLP позволяет анализировать текстовые данные, выделять ключевую информацию, определять тональность и проводить другие операции.
                    </ServicesP>
                </ServicesCard>
                <ServicesCard>
                    <NameRectangleCard >
                        <ServicesAd>2. Машинный перевод</ServicesAd>
                    </NameRectangleCard>
                    <ServicesIcon src={NLP2} />
                    <ServicesP>
                    Модели NLP могут использоваться для автоматического перевода текстов с одного языка на другой, а также для генерации текста на основе заданных параметров.
                    </ServicesP>
                </ServicesCard>
                <ServicesCard className='lowered'>
                    <NameRectangleCard >
                        <ServicesAd>3. Анализ эмоций</ServicesAd>
                    </NameRectangleCard>
                    <ServicesIcon src={NLP3} />
                    <ServicesP>
                    NLP способен определять эмоциональную окраску текстовых сообщений, что может быть полезным в анализе отзывов, комментариев и социальных медиа.
                    </ServicesP>
                </ServicesCard>
            </ServicesWrapper>
            <ServicesBtnWrapper>
                <Button to='nlp-slider' onMouseEnter={onHover} onMouseLeave={onHover} smooth={true}
                                    duration={500}
                                    spy={true}>
                    Попробовать {hover ? <ArrowForward /> : <ArrowRight
                    />}
                </Button>
            </ServicesBtnWrapper>


        </ServicesContainer>
    )
}

export default NLPCardSection;