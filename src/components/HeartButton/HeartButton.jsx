import { HeartButton, StyledHeartIcon } from './HeartButton.styles';

function Heart({ size, border, isActive = false, count = 0 }) {
  const formattedCount = count >= 9999 ? '9999+' : count;

  return (
    <HeartButton size={size} border={border}>
      <StyledHeartIcon size={size} isActive={isActive} border={border} />
      {formattedCount}
    </HeartButton>
  );
}

export default Heart;
