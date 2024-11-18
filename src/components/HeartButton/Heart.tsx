import { HeartButton } from './Heart.styles';
import HeartIcon from './HeartIcon';

interface HeartProps {
  size?: 'sm' | 'md';
  borderType?: boolean;
  isActive?: boolean;
  count: number;
  wide?: boolean;
}

function Heart({
  size,
  borderType,
  isActive = false,
  count = 0,
  wide,
  ...rest
}: HeartProps) {
  const formattedCount = count >= 9999 ? '9999+' : count;

  return (
    <HeartButton size={size} borderType={borderType} wide={wide} {...rest}>
      <HeartIcon size={size} isActive={isActive} borderType={borderType} />
      {formattedCount}
    </HeartButton>
  );
}

export default Heart;
