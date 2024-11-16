import styled from 'styled-components';

const StyledTagsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ onRemove }) => (!onRemove ? '0.8rem' : '1.2rem')};
`;

export { StyledTagsList };
