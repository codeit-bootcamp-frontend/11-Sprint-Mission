import React from 'react';
import styled, { css } from 'styled-components';

const colorStyles = {
  blue: css`
    background-color: var(--blue-100);
    &:hover {
      background-color: var(--blue-300);
    }
  `,
  gray: css`
    background-color: var(--gray-400);
  `,
  white: css`
    background-color: var(--gray-50);
    color: var(--blue-100);
    border: 1px solid var(--blue-100);
  `,
};

const sizeStyles = {
  small: css`
    font-size: 1.6rem;
    line-height: 2.6rem;
    padding: 0.8rem 2.3rem;
  `,
  medium: css`
    font-size: 1.8rem;
    line-height: 2.6rem;
    padding: 1.1rem 3.95rem;
  `,
};

export const StyledButton = styled.button`
  ${({ $round }) =>
    $round ? 'border-radius: 4rem;' : 'border-radius: 0.8rem;'}
  ${({ $color }) => colorStyles[$color] || ''}
  ${({ $size }) => sizeStyles[$size] || ''}

  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  ${({ $color }) =>
    $color === 'not' ? 'color: var(--gray-500);' : 'color: #fff;'}
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
`;

function Button({
  href = undefined,
  color = 'blue',
  size = 'small',
  disabled = false,
  round,
  children,
  ...rest
}) {
  return (
    <StyledButton
      $color={color}
      $size={size}
      $round={round}
      as={href ? 'a' : 'button'}
      href={href}
      disabled={disabled}
      {...rest}>
      {children}
    </StyledButton>
  );
}

export default Button;
