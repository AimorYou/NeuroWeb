import React from 'react';
import { Button } from '../globalStyles';
import { AiFillThunderbolt } from 'react-icons/ai';
import { GiCrystalBars } from 'react-icons/gi';
import { GiCutDiamond, GiRock } from 'react-icons/gi';
import { GiFloatingCrystal } from 'react-icons/gi';
import { IconContext } from 'react-icons/lib';
import Classify from '../../assets/images/images.jpg'
import Emotion from '../../assets/images/texts.jpg'
import Detect from '../../assets/images/tablesStreamlit.jpg'
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
} from './ChooseModelElements';

function Pricing() {
  return (
    <IconContext.Provider value={{ color: '#a9b3c1', size: 64 }}>
      <AdvantagesSection>
        <PricingWrapper>
          <PricingHeading>Выберите область работы</PricingHeading>
          <PricingContainer>
            <PricingCard to='/cv-models'>
              <PricingCardInfo>
              <PricingCardIcon src={Classify} />
                <PricingCardPlan>Работа с изображениями</PricingCardPlan>
                <PricingCardFeatures>
                  <PricingCardFeature>Модель идентифицирует и классифицирует объекты на основе их характеристик, обучаясь на размеченных данных</PricingCardFeature>
                </PricingCardFeatures>
                <Button primary>Выбрать</Button>
              </PricingCardInfo>
            </PricingCard>
            <PricingCard to='/nlp-models'>
              <PricingCardInfo>
              <PricingCardIcon src={Emotion} />
                <PricingCardPlan>Работа с естественным языком</PricingCardPlan>
                <PricingCardFeatures>
                  <PricingCardFeature>Модель анализирует лицевые выражения, определяя эмоциональное состояние на основе распознанных паттернов</PricingCardFeature>
                </PricingCardFeatures>
                <Button primary>Выбрать</Button>
              </PricingCardInfo>
            </PricingCard>
            <PricingCard to='/tables'>
              <PricingCardInfo>
              <PricingCardIcon src={Detect} />
                <PricingCardPlan>Работа с таблицами</PricingCardPlan>
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