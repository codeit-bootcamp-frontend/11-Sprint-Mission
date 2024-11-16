import styled, { css } from 'styled-components';
import font from '../../styles/fontStyle.styles';
import { flexColumn } from '../../styles/layout.styles';

const StyledNotResult = styled.div`
  ${flexColumn}
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
