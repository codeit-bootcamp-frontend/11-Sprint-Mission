import { HeartButton } from './HeartButton.styles';
import HeartIcon from './HeartIcon';

function Heart({
  size,
  borderType,
  isActive = false,
  count = 0,
  wide,
  ...rest
}) {
  const formattedCount = count >= 9999 ? '9999+' : count;

  return (
    <HeartButton size={size} borderType={borderType} wide={wide} {...rest}>
      <HeartIcon size={size} isActive={isActive} borderType={borderType} />
      {formattedCount}
    </HeartButton>
  );
}

export default Heart;
