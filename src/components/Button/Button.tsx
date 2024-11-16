import { ReactNode } from 'react';
import StyledButton from './Button.styles';

interface ButtonProps {
  color: 'blue' | 'gray' | 'white' | 'none';
  size?: 'small' | 'medium';
  round?: boolean;
  wide?: boolean;
  children: ReactNode;
  href?: string;
  disabled?: boolean;
}

function Button({
  href,
  color,
  size = 'small',
  disabled = false,
  round,
  wide,
  children,
  ...rest
}: ButtonProps) {
  return (
    <StyledButton
      $color={color}
      $size={size}
      $round={round}
      $wide={wide}
      as={href ? 'a' : 'button'}
      href={href}
      disabled={disabled}
      {...rest}>
      {children}
    </StyledButton>
  );
}

export default Button;
