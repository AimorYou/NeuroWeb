import React, { useState } from 'react'
import { Button1 } from '../ButtonElements'
import {
  HeroContainer,
  HeroBg,
  HeroContent,
  HeroH1,
  HeroP,
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight
} from './HeroElements'


const HeroSection = () => {
  const [hover, setHover] = useState(false)
  const onHover = () => {
    setHover(!hover)
  }

  return (
    <HeroContainer>
      <HeroBg>
        {/* TODO: Вставить картинку */}
      </HeroBg>
      <HeroContent>
        <HeroH1>Раскройте потенциал искусственного интеллекта с помощью NeuroWeb</HeroH1>
        <HeroP>

        </HeroP>
        <HeroBtnWrapper>
          <Button1 to='/getstarted' onMouseEnter={onHover} onMouseLeave={onHover}>
            Начать {hover ? <ArrowForward /> : <ArrowRight
            />}
          </Button1>
        </HeroBtnWrapper>
      </ HeroContent>
    </HeroContainer>
  )
}

export default HeroSection