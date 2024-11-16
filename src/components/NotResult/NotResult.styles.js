import styled, { css } from 'styled-components';
import font from '../../styles/fontStyle.styled';

const StyledNotResult = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ type }) => {
    if (type === 'comments') return '0.8rem';
    else return '1.6rem';
  }};

  p {
    text-align: center;
    color: var(--gray-400);
    ${font('16')}
  }
`;

export const StyledImages = styled.img`
  ${({ type }) => {
    if (type === 'inquiry') {
      return css`
        width: 19.6rem;
        height: 19.6rem;
      `;
    } else {
      return css`
        width: 14rem;
        height: 14rem;
      `;
    }
  }}
`;

export default StyledNotResult;
