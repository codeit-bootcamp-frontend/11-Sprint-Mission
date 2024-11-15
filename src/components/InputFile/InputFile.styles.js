import { styled } from 'styled-components';

import IC_X from '../../assets/ic_X.svg';
import font from '../../styles/fontStyle.styled';

export const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const FileArea = styled.div`
  display: flex;
  gap: 2.4rem;

  label[for='productFile'] {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 28.2rem;
    height: 28.2rem;
    border-radius: 1.2rem;
    background-color: var(--gray-100);
    color: var(--gray-400);
    ${font('16')}

    img {
      width: 4.8rem;
      height: 4.8rem;
      margin-bottom: 1.2rem;
    }
  }

  @media screen and (max-width: 1199px) {
    gap: 1rem;

    label[for='productFile'] {
      width: 16.8rem;
      height: 16.8rem;
    }
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileInputError = styled.p`
  ${font('16')}
  color: var(--red);
`;

export const PreviewContainer = styled.div`
  position: relative;
  width: 28.2rem;
  height: 28.2rem;
  border-radius: 1.2rem;
  overflow: hidden;

  @media screen and (max-width: 1199px) {
    width: 16.8rem;
    height: 16.8rem;
  }
`;

export const ButtonDelete = styled.button`
  position: absolute;
  width: 2.2rem;
  height: 2.4rem;
  top: 1.2rem;
  right: 1.2rem;
  background: url(${IC_X}) no-repeat center/contain;
  font-size: 0;
  z-index: 1;
`;
