import React, { useState } from 'react'

import Icon1 from '../../assets/images/Dmitry.svg'
import Icon2 from '../../assets/images/Arseny.svg'
import Icon3 from '../../assets/images/Nikita.svg'

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
} from './TeamElements';

const TeamPage = () => {
    const [hover, setHover] = useState(false)
    const onHover = () => {
        setHover(!hover)
    }
    return (
        <ServicesContainer id="services">

            <RectangleCard>
                <ServicesH1>Команда</ServicesH1>
            </RectangleCard>
            <ServicesWrapper>
                <ServicesCard>
                    <ServicesIcon src={Icon1} />
                    <ServicesH2>Королев Дмитрий</ServicesH2>
                </ServicesCard>
                <ServicesCard>
                    <ServicesIcon src={Icon2} />
                    <ServicesH2>Пивоваров Арсений</ServicesH2>
                </ServicesCard>
                <ServicesCard>
                    <ServicesIcon src={Icon3} />
                    <ServicesH2>Рыбаковский Никита</ServicesH2>
                </ServicesCard>
            </ServicesWrapper>
            <ServicesBtnWrapper>
            </ServicesBtnWrapper>


        </ServicesContainer>
    )
}

export default TeamPage;