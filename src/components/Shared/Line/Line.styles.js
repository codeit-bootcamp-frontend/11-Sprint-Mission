import styled from 'styled-components';

export const StyledLine = styled.hr`
  margin: auto;
  border: 0;
  background: var(--gray-200);
  ${({ $column }) =>
    $column ? 'width: 1px; height: 3.4rem' : 'width: 100%; height: 1px;'}
`;
