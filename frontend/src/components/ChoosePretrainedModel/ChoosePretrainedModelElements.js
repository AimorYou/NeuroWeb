import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const AdvantagesSection = styled.div`
  padding: 100px 0 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #101021;
`;

export const PricingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  @media screen and (max-width: 960px) {
    margin: 0 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const PricingHeading = styled.h1`
  color: #fff;
  font-size: 48px;
  margin-bottom: 24px;

  @media screen and (max-width: 960px) {
    text-align: center;
    font-size: 42px;
  }
`;

export const PricingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 960px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

export const PricingCard = styled(Link)`
  background: #242424;
  box-shadow: 0 6px 20px rgba(56, 125, 255, 0.2);
  width: 300px;
  height: 400px;
  text-decoration: none;
  border-radius: 10px;
  margin: 24px;
  text-align: center;
  

  &:hover {
    transform: scale(1.06);
    transition: all 0.3s ease-out;
    color: #1c2237;
  }

  @media screen and (max-width: 960px) {
    width: 90%;

    &:hover {
      transform: none;
    }
  }
`;

export const PricingCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  padding: 20px;
  align-items: center;
  color: #fff;
`;

export const PricingCardIcon = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 300px;
  border: 2px solid #7258E9;
  margin: 24px 0;
`;

export const PricingCardPlan = styled.h3`
  margin-bottom: 5px;
  font-size: 16px;
`;

export const PricingCardCost = styled.h4`
  font-size: 30px;
`;

export const PricingCardLength = styled.p`
  font-size: 12px;
  margin-bottom: 24px;
`;

export const PricingCardFeatures = styled.ul`
  margin: 16px 0 32px;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #a9b3c1;
  font-size: 14px;
`;

export const PricingCardFeature = styled.li`
  margin-bottom: 10px;
  text-align: center;
`;