import React, { useState } from 'react'

import Icon1 from '../../assets/images/Frame-1.svg'
import Icon2 from '../../assets/images/Frame.svg'
import Icon3 from '../../assets/images/Vector.svg'
import Icon4 from '../../assets/images/Mask group.svg'

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
} from './ServicesElements';

const Services = () => {
    const [hover, setHover] = useState(false)
    const onHover = () => {
        setHover(!hover)
    }
    return (
        <ServicesContainer id="services">

            <RectangleCard>
                <ServicesH2>Почему NeuroWeb?</ServicesH2>
                <ServicesH1>Преимущества</ServicesH1>
            </RectangleCard>
            <ServicesWrapper>
                <ServicesCard>
                    <NameRectangleCard>
                        <ServicesAd>1. Многофункциональность</ServicesAd>
                    </NameRectangleCard>
                    <ServicesIcon src={Icon1} />
                </ServicesCard>
                <ServicesCard>
                    <NameRectangleCard>
                        <ServicesAd>2. Маштабируемость</ServicesAd>
                    </NameRectangleCard>
                    <ServicesIcon src={Icon2} />
                </ServicesCard>
                <ServicesCard>
                    <NameRectangleCard>
                        <ServicesAd>3. Аналитика</ServicesAd>
                    </NameRectangleCard>
                    <ServicesIcon src={Icon3} />
                </ServicesCard>
                <ServicesCard>
                    <NameRectangleCard>
                        <ServicesAd>4. Эффективность</ServicesAd>
                    </NameRectangleCard>
                    <ServicesIcon src={Icon4} />
                </ServicesCard>
            </ServicesWrapper>
            <ServicesBtnWrapper>
                <Button1 to='/getstarted' onMouseEnter={onHover} onMouseLeave={onHover}>
                    Попробовать {hover ? <ArrowForward /> : <ArrowRight
                    />}
                </Button1>
            </ServicesBtnWrapper>


        </ServicesContainer>
    )
}

export default Services;