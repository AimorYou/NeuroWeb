import React, { useState } from 'react'
import { Button2 } from '../ButtonElements'
import { InfoContainer,
    InfoWrapper,
    InfoRow,
    Column1,
    Column2,
    TextWrapper,
    TopLine,
    Heading,
    Subtitle,
    BtnWrap,
    ImgWrap,
    Img,
    ServicesCard,
    ArrowForward,
    ArrowRight
 } from './InfoElements';

const InfoSection = ({darkBg, display, lightBg, id, imgStart, topLine, lightText, heading, darkText, description1, description2, buttonLabel, img, alt, primary, dark, dark2, link}) => {
    const [hover, setHover] = useState(false)
    const onHover = () => {
        setHover(!hover)
    }
    
    return (

    <>
        <InfoContainer lightBg={lightBg} id={id}>
            <ServicesCard darkBg={darkBg}>
                <InfoWrapper>
                    <InfoRow imgStart={imgStart}>
                        <Column1>
                            <TextWrapper>
                                <TopLine>{topLine}</TopLine>
                                <Heading lightText={lightText}>{heading}</Heading>
                                <Subtitle darkText={darkText}>{description1}</Subtitle>
                                <Subtitle darkText={darkText}>{description2}</Subtitle>
                                <BtnWrap>
                                    <Button2 to={link}
                                    onMouseEnter={onHover} onMouseLeave={onHover}
                                    smooth={true}
                                    duration={500}
                                    spy={true}
                                    exact="true"
                                    offset={-80}
                                    primary={primary ? 1 : 0}
                                    dark={dark ? 1 : 0}
                                    dark2={dark2 ? 1 : 0}
                                    display={display}
                                    >{buttonLabel}{hover ? <ArrowForward /> : <ArrowRight/>}</Button2>
                                </BtnWrap>
                            </TextWrapper>
                        </Column1>
                        <Column2>
                        <ImgWrap>
                        <Img src={img} alt={alt}/>
                        </ImgWrap>
                        </Column2>
                    </ InfoRow>
                </InfoWrapper>
            </ServicesCard>
        </InfoContainer>
    </>
    );
};

export default InfoSection;