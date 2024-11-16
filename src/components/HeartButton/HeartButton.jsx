import { HeartButton, StyledHeartIcon } from './HeartButton.styles';

function Heart({ size, borderType, isActive = false, count = 0, ...rest }) {
  const formattedCount = count >= 9999 ? '9999+' : count;

  return (
    <HeartButton size={size} borderType={borderType} {...rest}>
      <StyledHeartIcon
        size={size}
        isActive={isActive}
        borderType={borderType}
      />
      {formattedCount}
    </HeartButton>
  );
}

export default Heart;
