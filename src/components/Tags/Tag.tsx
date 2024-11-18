import BtnClose from '../Shared/BtnClose/BtnClose';
import StyledTagContainer from './Tag.styles';

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
