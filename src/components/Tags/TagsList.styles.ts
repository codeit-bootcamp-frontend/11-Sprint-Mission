import styled from 'styled-components';

interface StyledTagsListProps {
  hasOnRemove: boolean;
}

const StyledTagsList = styled.ul.withConfig({
  shouldForwardProp: (prop) => !['hasOnRemove'].includes(prop),
})<StyledTagsListProps>`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ hasOnRemove }) => (hasOnRemove ? '0.8rem' : '1.2rem')};
`;

export { StyledTagsList };
