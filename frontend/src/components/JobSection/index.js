import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from '../globalStyles';
import {
  InfoSec,
  InfoRow,
  InfoColumn,
  TextWrapper,
  TopLine,
  Heading,
  Subtitle,
  ImgWrapper,
  Img
} from './JobElements';

function InfoSection({
  primary,
  lightBg,
  topLine,
  lightTopLine,
  lightText,
  lightTextDesc,
  headline,
  description1,
  description2,
  description3,
  buttonLabel,
  img,
  alt,
  imgStart,
  start
}) {
  return (
    <>
      <InfoSec lightBg={lightBg}>
        <Container>
          <InfoRow imgStart={imgStart}>
            <InfoColumn>
              <TextWrapper>
                <Heading lightText={lightText}>{headline}</Heading>
                <TopLine lightTopLine={lightTopLine}>{topLine}</TopLine>
                <Subtitle lightTextDesc={lightTextDesc}>{description1}</Subtitle>
                <Subtitle lightTextDesc={lightTextDesc}>{description2}</Subtitle>
                <Subtitle lightTextDesc={lightTextDesc}>{description3}</Subtitle>
              </TextWrapper>
            </InfoColumn>
            <InfoColumn>
              <ImgWrapper start={start}>
                <Img src={img} alt={alt} />
              </ImgWrapper>
            </InfoColumn>
          </InfoRow>
        </Container>
      </InfoSec>
    </>
  );
}

export default InfoSection;