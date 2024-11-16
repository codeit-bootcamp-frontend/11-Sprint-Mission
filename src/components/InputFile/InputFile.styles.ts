import { styled } from 'styled-components';

import font from '../../styles/fontStyle.styles';
import { flexColumn } from '../../styles/layout.styles';
import ButtonDelete from '../Shared/BtnClose/BtnClose.styles';

export const FileContainer = styled.div`
  ${flexColumn}
  gap: 1.6rem;
  h3 {
    ${font('18b')}
  }
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

export const PreviewButton = styled(ButtonDelete)`
  position: absolute;
`;
