import Link from 'next/link';
import styled from 'styled-components';

import { media } from '@/styles/media.styles';

const LOGO_PC = '/logo.png';
const LOGO_MO = '/logo_mo.png';

type LogoProps = {
  size: 'sm' | 'md';
};

function Logo({ size = 'sm' }: LogoProps) {
  return (
    <StyledLogo size={size}>
      <Link href='/' />
    </StyledLogo>
  );
}

export const StyledLogo = styled.h1<LogoProps>`
  width: ${({ size }) => (size === 'sm' ? '15.3rem' : '39.6rem')};
  height: ${({ size }) => (size === 'sm' ? '5.1rem' : '13.2rem')};
  background: url(${LOGO_PC}) no-repeat center/cover;

  a {
    width: 100%;
    height: 100%;
  }

  ${media.mo`
    width: ${({ size }) => (size === 'sm' ? '8.1rem' : '19.8rem')};
    height: ${({ size }) => (size === 'sm' ? '2.7rem' : '6.6rem')};
    background: url(${LOGO_MO}) no-repeat center/cover;
  `}
`;

export default Logo;
