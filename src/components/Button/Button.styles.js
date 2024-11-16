import styled from 'styled-components';

const colorStyles = {
  blue: {
    default: 'var(--blue-100)',
    hover: 'var(--blue-300)',
    textColor: '#fff',
  },
  gray: {
    default: 'var(--gray-400)',
    textColor: '#fff',
  },
  white: {
    default: 'var(--gray-50)',
    textColor: 'var(--blue-100)',
    border: '1px solid var(--blue-100)',
  },
};

const sizeStyles = {
  small: {
    fontSize: '1.6rem',
    lineHeight: '2.6rem',
    padding: '0.8rem 2.3rem',
  },
  medium: {
    fontSize: '1.8rem',
    lineHeight: '2.6rem',
    padding: '1.1rem 3.95rem',
  },
};

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  width: ${({ $wide }) => ($wide ? '100%' : 'auto')};

  border-radius: ${({ $round }) => ($round ? '4rem' : '1.2rem')};
  background-color: ${({ $color, disabled }) =>
    disabled ? 'var(--gray-400)' : colorStyles[$color]?.default};
  color: ${({ $color, disabled }) =>
    disabled ? '#fff' : colorStyles[$color]?.textColor || '#333'};
  border: ${({ $color }) => colorStyles[$color]?.border || 'none'};

  font-size: ${({ $size }) => sizeStyles[$size]?.fontSize || '1.6rem'};
  line-height: ${({ $size }) => sizeStyles[$size]?.lineHeight || '2.6rem'};
  padding: ${({ $size }) => sizeStyles[$size]?.padding || '0.8rem 2.3rem'};

  &:hover {
    background-color: ${({ $color }) =>
      colorStyles[$color]?.hover || colorStyles[$color]?.default};
  }
`;

export default StyledButton;
