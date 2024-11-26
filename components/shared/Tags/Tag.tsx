import styled from 'styled-components';
import font from '@/styles/fontStyle.styles';

import BtnClose from '../BtnClose';

interface TagProps {
  tag: string;
  onRemove?: (tag: string) => void;
}

function Tag({ tag, onRemove }: TagProps) {
  return (
    <StyledTagContainer>
      <span>#{tag}</span>
      {onRemove && <BtnClose onClick={() => onRemove(tag)} />}
    </StyledTagContainer>
  );
}

export default Tag;

const StyledTagContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.5rem 1.6rem;
  background-color: var(--gray-100);
  border-radius: 5rem;
  ${font('16')}
`;
