import React, { useState } from 'react'




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
    ServicesH3,
    Button
} from './CustomCardsElements';
import { Button1 } from '../ButtonElements';

const Services = () => {
    const [hover, setHover] = useState(false)
    const onHover = () => {
        setHover(!hover)
    }
    return (
        <ServicesContainer id="services">

            <RectangleCard>
                <ServicesH2>Как пользоваться?</ServicesH2>
                <ServicesH1>Просто следуй шагам</ServicesH1>
            </RectangleCard>
            <ServicesWrapper>
                <ServicesCard>
                    <NameRectangleCard>
                        <ServicesAd>1. Загрузи данные</ServicesAd>
                    </NameRectangleCard>
                    <ServicesIcon  />
                    <ServicesH3>Соберите и сгруппируйте данные по классам, или категории, которые вы хотите, чтобы компьютер изучил.</ServicesH3>
                </ServicesCard>
                <ServicesCard className='lowered'>
                    <NameRectangleCard >
                        <ServicesAd>2. Обучи модель</ServicesAd>
                    </NameRectangleCard>
                    <ServicesIcon />
                    <ServicesH3>Обучите свою модель, а затем мгновенно протестируйте ее, чтобы проверить, может ли она правильно классифицировать новые примеры.</ServicesH3>
                </ServicesCard>
                <ServicesCard>
                    <NameRectangleCard>
                        <ServicesAd>3. Экспортируй</ServicesAd>
                    </NameRectangleCard>
                    <ServicesIcon  />
                    <ServicesH3>Экспортируйте модель для своих проектов: сайтов, приложений и т.д. Вы можете скачать модель или разместить ее в Интернете.</ServicesH3>
                </ServicesCard>
            </ServicesWrapper>
            <ServicesBtnWrapper>
                <Button1 to='/signin' onMouseEnter={onHover} onMouseLeave={onHover}>
                    Попробовать {hover ? <ArrowForward /> : <ArrowRight
                    />}
                </Button1>
               
            </ServicesBtnWrapper>


        </ServicesContainer>
    )
}

export default Services;