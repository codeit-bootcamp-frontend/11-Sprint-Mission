import StyledButton from './Button.styles';

function Button({
  href = undefined,
  color,
  size = 'small',
  disabled = false,
  round,
  wide,
  children,
  ...rest
}) {
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
