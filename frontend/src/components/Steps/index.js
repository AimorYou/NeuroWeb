import React from 'react';
import { Card } from '../globalStyles';
import { AiFillThunderbolt } from 'react-icons/ai';
import { GiCrystalBars } from 'react-icons/gi';
import { GiCutDiamond, GiRock } from 'react-icons/gi';
import { GiFloatingCrystal } from 'react-icons/gi';
import { IconContext } from 'react-icons/lib';
import Collection from '../../assets/images/collection.JPG'
import Training from '../../assets/images/training.JPG'
import Export from '../../assets/images/export.JPG'
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
} from './StepsElements';

function Pricing() {
  return (
    <IconContext.Provider value={{ color: '#a9b3c1', size: 64 }}>
      <AdvantagesSection>
        <PricingWrapper>
          <PricingHeading>Как использовать?</PricingHeading>
          <PricingContainer>
          <PricingCard to='/sign-up'>
              <PricingCardInfo>
                <PricingCardIcon src={Collection} />
                <Card primary>1. Собрать датасет</Card>
                <PricingCardFeatures>
                  <PricingCardFeature>Соберите и сгруппируйте примеры в классы, или категории, которые вы хотите, чтобы компьютер изучил.</PricingCardFeature>
                </PricingCardFeatures>
              </PricingCardInfo>
            </PricingCard>
            <PricingCard to='/sign-up'>
              <PricingCardInfo>
                <PricingCardIcon src={Training} />
                <Card primary>2. Обучить</Card>
                <PricingCardFeatures>
                  <PricingCardFeature>Обучите свою модель, а затем сразу же протестируйте ее, чтобы проверить, может ли она правильно классифицировать новые примеры.</PricingCardFeature>
                </PricingCardFeatures>
              </PricingCardInfo>
            </PricingCard>
            <PricingCard to='/sign-up'>
              <PricingCardInfo>
                <PricingCardIcon src={Export} />
                <Card primary>3. Экспортировать</Card>
                <PricingCardFeatures>
                  <PricingCardFeature>Экспортируйте модель для своих проектов: сайтов, приложений и других. Вы можете загрузить свою модель или разместить ее в Интернете.</PricingCardFeature>
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