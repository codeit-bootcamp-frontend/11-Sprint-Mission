import styled from 'styled-components';
import font from '@/styles/fontStyle.styles';
import { media } from '@/styles/media.styles';

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

interface HeartButtonProps {
  borderType?: boolean;
  size?: 'sm' | 'md';
  wide?: boolean;
}

export const HeartButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['size', 'borderType', 'wide'].includes(prop),
})<HeartButtonProps>`
  display: flex;
  align-items: center;
  color: var(--gray-500);
  cursor: pointer;
  width: auto;
  height: ${({ borderType }) => (borderType ? '4rem' : 'auto')};
  border-radius: ${({ borderType }) => (borderType ? '3.5rem' : '0')};
  border: ${({ borderType }) =>
    borderType ? '1px solid var(--gray-200)' : 'none'};
  padding: ${({ borderType }) => (borderType ? '0.4rem 1.2rem' : '0')};
  gap: ${({ borderType, size }) => {
    if (borderType) return '0.4rem';
    return size === 'sm' ? '0.4rem' : '0.8rem';
  }};
  flex: ${({ wide }) => wide && '1'};

  ${({ borderType, size }) => {
    if (borderType) return font('16m');
    return size === 'sm' ? font('14') : font('16');
  }}

  ${media.tamo`
    height: ${({ borderType }) => (borderType ? '3.2rem' : 'auto')};
  `}
`;
