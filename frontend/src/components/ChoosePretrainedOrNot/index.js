import React from 'react';
import { Button } from '../globalStyles';
import { AiFillThunderbolt } from 'react-icons/ai';
import { GiCrystalBars } from 'react-icons/gi';
import { GiCutDiamond, GiRock } from 'react-icons/gi';
import { GiFloatingCrystal } from 'react-icons/gi';
import { IconContext } from 'react-icons/lib';
import Classify from '../../assets/images/classify.JPG'
import Emotion from '../../assets/images/emotion.JPG'
import Detect from '../../assets/images/detect.JPG'
import {
  AdvantagesSection,
  PricingWrapper,
  PricingHeading,
  PricingContainer,
  PricingCard,
  PricingCardInfo,
  PricingCardIcon,
  PricingCardPlan,
  PricingCardCost,
  PricingCardLength,
  PricingCardFeatures,
  PricingCardFeature
} from './ChoosePretrainedOrNotElements';

function Pricing() {
  return (
    <IconContext.Provider value={{ color: '#a9b3c1', size: 64 }}>
      <AdvantagesSection>
        <PricingWrapper>
          <PricingHeading>Выберите - обучить модель на своих данных или попробовать уже предобученные модели</PricingHeading>
          <PricingContainer>
            <PricingCard to='/models-to-train'>
              <PricingCardInfo>
              <PricingCardIcon src={Classify} />
                <PricingCardPlan>Обучить модель на своих данных</PricingCardPlan>
                <PricingCardFeatures>
                  <PricingCardFeature>Модель идентифицирует и классифицирует объекты на основе их характеристик, обучаясь на размеченных данных</PricingCardFeature>
                </PricingCardFeatures>
                <Button primary>Выбрать</Button>
              </PricingCardInfo>
            </PricingCard>
            <PricingCard to='/pretrained-models'>
              <PricingCardInfo>
              <PricingCardIcon src={Emotion} />
                <PricingCardPlan>Попробовать предобученные модели</PricingCardPlan>
                <PricingCardFeatures>
                  <PricingCardFeature>Модель анализирует лицевые выражения, определяя эмоциональное состояние на основе распознанных паттернов</PricingCardFeature>
                </PricingCardFeatures>
                <Button primary>Выбрать</Button>
              </PricingCardInfo>
            </PricingCard>
          </PricingContainer>
        </PricingWrapper>
      </AdvantagesSection>
    </IconContext.Provider>
  );
}
export default Pricing;