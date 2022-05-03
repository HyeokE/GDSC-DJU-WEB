import React, { useState } from 'react';
import { Title } from '../../components/common/Title/title';
import {
  ContainerInner,
  LayoutContainer,
  TopMargin,
} from '../../styles/layouts';

import {
  AnswerText,
  AnswerWrapper,
  QuestionBr,
  QuestionInner,
  QuestionMark,
  QuestionWrapper,
} from './styled';
import { FaqData } from '../../apis/pageData/faq';
import { QuestionCategoryAnimate } from '../../components/common/Variants/Variants';
import { AnimatePresence, motion } from 'framer-motion';
import Banner from '../../components/common/Banner';

const Faq = () => {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <>
      <Banner color={'green'} />
      <LayoutContainer>
        <ContainerInner>
          <TopMargin />
          <Title>자주 묻는 질문</Title>
          <TopMargin />
          <AnimatePresence>
            {FaqData.map((data, id) => (
              <MemoFaqElement {...data} key={id} />
            ))}
          </AnimatePresence>
          <TopMargin />
        </ContainerInner>
      </LayoutContainer>
    </>
  );
};
interface faqProps {
  id: number;
  question: string;
  answer: string;
}

const FaqElement: React.FC<faqProps> = ({ id, question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div>
      <QuestionWrapper
        variants={QuestionCategoryAnimate}
        initial={'unHover'}
        animate={isOpen ? 'hovered' : 'unHover'}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <QuestionInner>
          <QuestionMark />
          {question}
        </QuestionInner>
      </QuestionWrapper>
      {isOpen && (
        <AnswerWrapper
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          initial={{ opacity: 0 }}
        >
          {answer.split('\n').map((text, id) => (
            <AnswerText key={id}>{text}</AnswerText>
          ))}
        </AnswerWrapper>
      )}
      <QuestionBr />
    </motion.div>
  );
};
const MemoFaqElement = React.memo(FaqElement);

export default Faq;
