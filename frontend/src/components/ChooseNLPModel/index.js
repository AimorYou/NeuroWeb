import React from 'react';
import { Button } from '../globalStyles';
import { IconContext } from 'react-icons/lib';
import Classify from '../../assets/images/classify.JPG';
import {
  AdvantagesSection,
  PricingWrapper,
  PricingHeading,
  PricingContainer,
  PricingCard,
  PricingCardInfo,
  PricingCardIcon,
  PricingCardPlan,
  PricingCardFeatures,
  PricingCardFeature,
  PlaceholderCard,
  PlaceholderText
} from './ChooseNLPModelElements';

function Pricing() {
  return (
    <IconContext.Provider value={{ color: '#a9b3c1', size: 64 }}>
      <AdvantagesSection>
        <PricingWrapper>
          <PricingHeading>Выберите модель обработки естественного языка</PricingHeading>
          <PricingContainer>
            <PricingCard to='/text'>
              <PricingCardInfo>
                <PricingCardIcon src={Classify} />
                <PricingCardPlan>Классификация текстов</PricingCardPlan>
                <PricingCardFeatures>
                  <PricingCardFeature>Модель идентифицирует и классифицирует объекты на основе их характеристик, обучаясь на размеченных данных</PricingCardFeature>
                </PricingCardFeatures>
                <Button primary>Выбрать</Button>
              </PricingCardInfo>
            </PricingCard>
            <PlaceholderCard>
              <PlaceholderText>Скоро появятся новые модели</PlaceholderText>
            </PlaceholderCard>
          </PricingContainer>
        </PricingWrapper>
      </AdvantagesSection>
    </IconContext.Provider>
  );
}

export default Pricing;
