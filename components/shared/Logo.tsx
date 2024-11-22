import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import deviceType from '../../utils/deviceType';

import { media } from '@/styles/media.styles';

const LOGO_PC = '/logo.png';
const LOGO_MO = '/logo_mo.png';

type LogoProps = {
  size: 'sm' | 'md';
};

function Logo({ size = 'sm' }: LogoProps) {
  return (
    <StyledLogo size={size}>
      <Link href='/'>
        <Image
          src={deviceType() === 'mo' ? LOGO_MO : LOGO_PC}
          alt='로고'
          width={153}
          height={51}
          priority
        />
      </Link>
    </StyledLogo>
  );
}

export const StyledLogo = styled.h1<LogoProps>`
  width: ${({ size }) => (size === 'sm' ? '15.3rem' : '39.6rem')};
  height: ${({ size }) => (size === 'sm' ? '5.1rem' : '13.2rem')};

  ${media.mo`
    width: ${({ size }) => (size === 'sm' ? '8.1rem' : '19.8rem')};
    height: ${({ size }) => (size === 'sm' ? '2.7rem' : '6.6rem')};
  `}
`;

export default Logo;
