import React from 'react';
import { Card } from '../globalStyles';
import { AiFillThunderbolt } from 'react-icons/ai';
import { GiCrystalBars } from 'react-icons/gi';
import { GiCutDiamond, GiRock } from 'react-icons/gi';
import { GiFloatingCrystal } from 'react-icons/gi';
import { IconContext } from 'react-icons/lib';
import CatBoost from '../../assets/images/CatBoost.jpg'
import Member1 from '../../assets/images/Arseny.svg'
import Member2 from '../../assets/images/Nikita.svg'
import Member3 from '../../assets/images/Dmitry.svg'
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
} from './TeamElements';

function Pricing() {
  return (
    <IconContext.Provider value={{ color: '#a9b3c1', size: 64 }}>
      <AdvantagesSection>
        <PricingWrapper>
          <PricingHeading>Команда NeuroWeb</PricingHeading>
          <PricingContainer>
          <PricingCard to='/sign-up'>
              <PricingCardInfo>
                <PricingCardIcon src={Member3} />
                <PricingCardPlan>Дмитрий Королев</PricingCardPlan>
                <PricingCardFeatures>
                  <PricingCardFeature>Frontend разработчик</PricingCardFeature>
                </PricingCardFeatures>
              </PricingCardInfo>
            </PricingCard>
            <PricingCard to='/sign-up'>
              <PricingCardInfo>
                <PricingCardIcon src={Member1} />
                <PricingCardPlan>Арсений Пивоваров</PricingCardPlan>
                <PricingCardFeatures>
                  <PricingCardFeature>ML разработчик</PricingCardFeature>
                </PricingCardFeatures>
              </PricingCardInfo>
            </PricingCard>
            <PricingCard to='/sign-up'>
              <PricingCardInfo>
                <PricingCardIcon src={Member2} />
                <PricingCardPlan>Никита Рыбаковский</PricingCardPlan>
                <PricingCardFeatures>
                  <PricingCardFeature>Backend разработчик</PricingCardFeature>
                </PricingCardFeatures>
              </PricingCardInfo>
            </PricingCard>
          </PricingContainer>
        </PricingWrapper>
      </AdvantagesSection>
    </IconContext.Provider>
  );
}
export default Pricing;