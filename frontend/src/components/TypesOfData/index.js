import React from 'react';
import { Card } from '../globalStyles';
import { AiFillThunderbolt } from 'react-icons/ai';
import { GiCrystalBars } from 'react-icons/gi';
import { GiCutDiamond, GiRock } from 'react-icons/gi';
import { GiFloatingCrystal } from 'react-icons/gi';
import { IconContext } from 'react-icons/lib';
import Image from '../../assets/images/image.JPG'
import Audio from '../../assets/images/audio.JPG'
import Tables from '../../assets/images/tables.JPG'
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
} from './TypesOfDataElements';

function Pricing() {
  return (
    <IconContext.Provider value={{ color: '#a9b3c1', size: 64 }}>
      <AdvantagesSection>
        <PricingWrapper>
          <PricingHeading>На каких данных можно обучать?</PricingHeading>
          <PricingContainer>
          <PricingCard to='/sign-up'>
              <PricingCardInfo>
                <PricingCardIcon src={Image} />
                <Card primary>1. Изображения</Card>
                <PricingCardFeatures>
                  <PricingCardFeature>Соберите и сгруппируйте примеры в классы, или категории, которые вы хотите, чтобы компьютер изучил.</PricingCardFeature>
                </PricingCardFeatures>
              </PricingCardInfo>
            </PricingCard>
            <PricingCard to='/sign-up'>
              <PricingCardInfo>
                <PricingCardIcon src={Audio} />
                <Card primary>2. Аудио</Card>
                <PricingCardFeatures>
                  <PricingCardFeature>Обучите свою модель, а затем сразу же протестируйте ее, чтобы проверить, может ли она правильно классифицировать новые примеры.</PricingCardFeature>
                </PricingCardFeatures>
              </PricingCardInfo>
            </PricingCard>
            <PricingCard to='/sign-up'>
              <PricingCardInfo>
                <PricingCardIcon src={Tables} />
                <Card primary>3. Таблицы</Card>
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