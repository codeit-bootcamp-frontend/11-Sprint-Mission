import styled from 'styled-components';
import { LineProps } from './Line';

export const StyledLine = styled.hr.withConfig({
  shouldForwardProp: (prop) => !['column'].includes(prop),
})<LineProps>`
  margin: auto;
  border: 0;
  background: var(--gray-200);
  ${({ column }) =>
    column ? 'width: 1px; height: 3.4rem' : 'width: 100%; height: 1px;'}
`;
