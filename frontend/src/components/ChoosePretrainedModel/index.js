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
} from './ChoosePretrainedModelElements';

function Pricing() {
  return (
    <IconContext.Provider value={{ color: '#a9b3c1', size: 64 }}>
      <AdvantagesSection>
        <PricingWrapper>
          <PricingHeading>Выберите предобученную модель</PricingHeading>
          <PricingContainer>
            <PricingCard to='/classification'>
              <PricingCardInfo>
              <PricingCardIcon src={Classify} />
                <PricingCardPlan>Классификация изображений</PricingCardPlan>
                <PricingCardFeatures>
                  <PricingCardFeature>Модель идентифицирует и классифицирует объекты на основе их характеристик, обучаясь на размеченных данных</PricingCardFeature>
                </PricingCardFeatures>
                <Button primary>Выбрать</Button>
              </PricingCardInfo>
            </PricingCard>
            <PricingCard to='/emotions'>
              <PricingCardInfo>
              <PricingCardIcon src={Emotion} />
                <PricingCardPlan>Распознование эмоций</PricingCardPlan>
                <PricingCardFeatures>
                  <PricingCardFeature>Модель анализирует лицевые выражения, определяя эмоциональное состояние на основе распознанных паттернов</PricingCardFeature>
                </PricingCardFeatures>
                <Button primary>Выбрать</Button>
              </PricingCardInfo>
            </PricingCard>
            <PricingCard to='/detection'>
              <PricingCardInfo>
              <PricingCardIcon src={Detect} />
                <PricingCardPlan>Детекция</PricingCardPlan>
                <PricingCardFeatures>
                  <PricingCardFeature>Модель обнаруживает и локализует объекты на изображениях, позволяя идентифицировать их положение и границы</PricingCardFeature>
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