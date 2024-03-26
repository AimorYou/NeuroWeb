import React from 'react';
import { Card } from '../globalStyles';
import { AiFillThunderbolt } from 'react-icons/ai';
import { GiCrystalBars } from 'react-icons/gi';
import { GiCutDiamond, GiRock } from 'react-icons/gi';
import { GiFloatingCrystal } from 'react-icons/gi';
import { IconContext } from 'react-icons/lib';
import Versality from '../../assets/images/versality.JPG'
import Scalability from '../../assets/images/scalability.JPG'
import Analytics from '../../assets/images/analytics.JPG'
import Efficiency from '../../assets/images/efficiency.JPG'
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
} from './ServicesElements';

function Pricing() {
  return (
    <IconContext.Provider value={{ color: '#a9b3c1', size: 64 }}>
      <AdvantagesSection>
        <PricingWrapper>
          <PricingHeading>Наши преимущества</PricingHeading>
          <PricingContainer>
          <PricingCard to='/sign-up'>
              <PricingCardInfo>
                <PricingCardIcon src={Versality} />
                <Card primary>1. Многопрофильность</Card>
                <PricingCardFeatures>
                  <PricingCardFeature>Разнообразие областей</PricingCardFeature>
                  <PricingCardFeature>Гибкость выбора</PricingCardFeature>
                  <PricingCardFeature>Гибкость выбора</PricingCardFeature>
                </PricingCardFeatures>
              </PricingCardInfo>
            </PricingCard>
            <PricingCard to='/sign-up'>
              <PricingCardInfo>
                <PricingCardIcon src={Scalability} />
                <Card primary>2. Маштабируемость</Card>
                <PricingCardFeatures>
                  <PricingCardFeature>Развитие по мере</PricingCardFeature>
                  <PricingCardFeature>Увеличение объемов</PricingCardFeature>
                  <PricingCardFeature>Готовность к расширению</PricingCardFeature>
                </PricingCardFeatures>
              </PricingCardInfo>
            </PricingCard>
            <PricingCard to='/sign-up'>
              <PricingCardInfo>
                <PricingCardIcon src={Analytics} />
                <Card primary>3. Аналитика</Card>
                <PricingCardFeatures>
                  <PricingCardFeature>Глубокий анализ данных</PricingCardFeature>
                  <PricingCardFeature>Визуализация метрик</PricingCardFeature>
                  <PricingCardFeature>Повышение зп</PricingCardFeature>
                </PricingCardFeatures>
              </PricingCardInfo>
            </PricingCard>
            <PricingCard to='/sign-up'>
              <PricingCardInfo>
                <PricingCardIcon src={Efficiency} />
                <Card primary>4. Эффективность</Card>
                <PricingCardFeatures>
                  <PricingCardFeature>Оптимизация процессов</PricingCardFeature>
                  <PricingCardFeature>Минимизация времени</PricingCardFeature>
                  <PricingCardFeature>Максимальный результат</PricingCardFeature>
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