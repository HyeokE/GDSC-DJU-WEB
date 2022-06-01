import React from 'react';
import styled from 'styled-components';
import {
  HomeSectionContainer,
  HomeSectionContainerInner,
  HomeSectionTitle,
  HomeSectionWrapper,
} from './styled';
import { culture } from '../../apis/pageData/culture';
import { motion } from 'framer-motion';
import { listAnimate, listItemAnimate } from '../common/Variants/Variants';

const CultureContentSection = styled(motion.section)`
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  margin-top: 80px;
  @media (max-width: ${({ theme }) => theme.windowSize.tablet}px) {
    margin-top: 40px;
    gap: 30px;
  }
`;
const CultureContentWrapper = styled(motion.div)`
  width: 450px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  @media (max-width: ${({ theme }) => theme.windowSize.mobile}px) {
    gap: 20px;
  }
`;
const CultureTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.h3};
  @media (max-width: ${({ theme }) => theme.windowSize.tablet}px) {
    font-size: ${({ theme }) => theme.fontSize.h4};
    max-width: 330px;
  }
  @media (max-width: ${({ theme }) => theme.windowSize.mobile}px) {
    font-size: ${({ theme }) => theme.fontSize.h5};
    max-width: 330px;
  }
`;
const CultureText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.body1};
  color: ${({ theme }) => theme.colors.grey600};
  line-height: 1.5;
  word-break: break-all;
  @media (max-width: ${({ theme }) => theme.windowSize.tablet}px) {
    font-size: ${({ theme }) => theme.fontSize.body2};
    max-width: 330px;
  }
`;

const SectionCulture = () => {
  return (
    <HomeSectionContainer>
      <HomeSectionContainerInner>
        <HomeSectionWrapper>
          <HomeSectionTitle>GDSC DJU만의 문화를 소개해요</HomeSectionTitle>
          <CultureContentSection variants={listItemAnimate}>
            {culture.map((data, index) => (
              <CultureContentWrapper
                key={index}
                variants={listAnimate}
                whileInView={'once'}
              >
                <CultureTitle>{data.title}</CultureTitle>
                <CultureText>{data.text}</CultureText>
              </CultureContentWrapper>
            ))}
          </CultureContentSection>
        </HomeSectionWrapper>
      </HomeSectionContainerInner>
    </HomeSectionContainer>
  );
};

export default SectionCulture;
