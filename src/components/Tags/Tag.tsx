import BtnClose from '../Shared/BtnClose/BtnClose';
import StyledTagContainer from './Tag.styles';

function Tag({ tag, onRemove = null }) {
  return (
    <StyledTagContainer>
      <span>#{tag}</span>
      {onRemove && <BtnClose onClick={() => onRemove(tag)} />}
    </StyledTagContainer>
  );
}

export default Tag;
