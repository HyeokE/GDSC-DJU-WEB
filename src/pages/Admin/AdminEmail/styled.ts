import styled from 'styled-components';

export const CheckboxSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
`;
export const SelectedBoxSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
  flex-direction: column;
`;
export const TemplateSelectorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 50px;
  width: 700px;
  justify-content: space-between;
  margin: 30px 0;
`;
export const TemplateEmailWrapper = styled.div`
  width: 300px;
`;
export const TemplateText = styled.div`
  font-size: ${({ theme }) => theme.fontSize.h7};
  display: flex;
  align-items: center;
  text-align: center;
`;
