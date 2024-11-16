import styled from 'styled-components';
import font from '../../styles/fontStyle.styles';

const colorStyles = {
  blue: {
    default: 'var(--blue-100)',
    hover: 'var(--blue-300)',
    textColor: '#fff',
    border: 'none',
  },
  gray: {
    default: 'var(--gray-400)',
    hover: '',
    textColor: '#fff',
    border: 'none',
  },
  white: {
    default: 'var(--gray-50)',
    hover: '',
    textColor: 'var(--blue-100)',
    border: '1px solid var(--blue-100)',
  },
  none: {
    default: '',
    hover: '',
    textColor: 'var(--gray-500)',
    border: 'none',
  },
} as const;

type ColorType = keyof typeof colorStyles;

interface StyledButtonProps {
  $color: ColorType;
  $size?: 'small' | 'medium';
  $round?: boolean;
  $wide?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  cursor: pointer;
  white-space: nowrap;
  width: ${({ $wide }) => ($wide ? '100%' : 'auto')};

  border-radius: ${({ $round }) => ($round ? '4rem' : '1.2rem')};
  background-color: ${({ $color, disabled }) =>
    disabled ? 'var(--gray-400)' : colorStyles[$color]?.default};
  color: ${({ $color, disabled }) =>
    disabled ? '#fff' : colorStyles[$color]?.textColor || 'var(--gray-500)'};
  border: ${({ $color }) => colorStyles[$color]?.border || 'none'};

  ${({ $size }) => $size === 'small' && font('16sb')}
  ${({ $size }) => $size === 'medium' && font('18sb')}
  padding: ${({ $size }) =>
    $size === 'small' ? '0.8rem 2.3rem' : '1.1rem 3.95rem'};

  &:hover {
    background-color: ${({ $color }) =>
      colorStyles[$color]?.hover || colorStyles[$color]?.default};
  }
`;

export default StyledButton;
