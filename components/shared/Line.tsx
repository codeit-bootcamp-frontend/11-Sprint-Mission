import styled from 'styled-components';

export interface LineProps {
  column?: boolean;
  className?: string;
}

function Line({ column, className }: LineProps) {
  return <StyledLine column={column} className={className} />;
}

export default Line;

export const StyledLine = styled.hr.withConfig({
  shouldForwardProp: (prop) => !['column'].includes(prop),
})<LineProps>`
  margin: auto;
  border: 0;
  background: var(--gray-200);
  ${({ column }) =>
    column ? 'width: 1px; height: 3.4rem' : 'width: 100%; height: 1px;'}
`;
