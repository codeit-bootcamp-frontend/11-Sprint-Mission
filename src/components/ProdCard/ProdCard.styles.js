import styled, { css } from 'styled-components';

import font from '../../styles/fontStyle.styled';
import { media } from '../../styles/media.styles';

const sizeStyles = {
  md: css`
    width: 28.2rem;
    height: 28.2rem;
    border-radius: 1.6rem;

    ${media.tamo`
      width: 34.3rem;
      height: 34.3rem;
      border-radius: 1.946rem;
    `}
  `,
  sm: css`
    width: 22rem;
    height: 22rem;
    border-radius: 1.6rem;

    ${media.mo`
      width: 16.8rem;
      height: 16.8rem;
      border-radius: 1.2rem;
    `}
  `,
};

const ProdContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const ProdImages = styled.div`
  overflow: hidden;
  ${({ $size }) => sizeStyles[$size] || ''}
`;

const PordDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  h3 {
    ${font('14m')}
  }

  p {
    ${font('16b')}
  }
`;

export { ProdContainer, ProdImages, PordDesc };
