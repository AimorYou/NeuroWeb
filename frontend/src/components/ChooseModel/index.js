import React from 'react';
import { Button } from '../globalStyles';
import { AiFillThunderbolt } from 'react-icons/ai';
import { GiCrystalBars } from 'react-icons/gi';
import { GiCutDiamond, GiRock } from 'react-icons/gi';
import { GiFloatingCrystal } from 'react-icons/gi';
import { IconContext } from 'react-icons/lib';
import CatBoost from '../../assets/images/CatBoost.jpg'
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
          <PricingHeading>Выберите область</PricingHeading>
          <PricingContainer>
            <PricingCard to='/classification'>
              <PricingCardInfo>
              <PricingCardIcon src={CatBoost} />
                <PricingCardPlan>Компьютерное зрение</PricingCardPlan>
                <PricingCardFeatures>
                  <PricingCardFeature>100 New Users</PricingCardFeature>
                  <PricingCardFeature>$10,000 Budget</PricingCardFeature>
                  <PricingCardFeature>Retargeting analytics</PricingCardFeature>
                </PricingCardFeatures>
                <Button primary>Выбрать</Button>
              </PricingCardInfo>
            </PricingCard>
            <PricingCard to='/emotions'>
              <PricingCardInfo>
              <PricingCardIcon src={CatBoost} />
                <PricingCardPlan>Обработка естественного языка</PricingCardPlan>
                <PricingCardFeatures>
                  <PricingCardFeature>1000 New Users</PricingCardFeature>
                  <PricingCardFeature>$50,000 Budget</PricingCardFeature>
                  <PricingCardFeature>Lead Gen Analytics</PricingCardFeature>
                </PricingCardFeatures>
                <Button primary>Выбрать</Button>
              </PricingCardInfo>
            </PricingCard>
            <PricingCard to='/detection'>
              <PricingCardInfo>
              <PricingCardIcon src={CatBoost} />
                <PricingCardPlan>Классчическое ML</PricingCardPlan>
                <PricingCardFeatures>
                  <PricingCardFeature>Unlimited Users</PricingCardFeature>
                  <PricingCardFeature>Unlimited Budget</PricingCardFeature>
                  <PricingCardFeature>24/7 Support</PricingCardFeature>
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