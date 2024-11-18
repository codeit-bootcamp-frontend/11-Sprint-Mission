import { Link } from 'react-router-dom';

import { StyledLogo } from './Logo.styles';

import LOGO_PC from '../../../assets/logo.png';
import LOGO_MO from '../../../assets/mobiles/logo.png';

const Logo = () => {
  return (
    <StyledLogo>
      <Link to={'/'}>
        <picture>
          <source srcSet={LOGO_MO} media='(max-width: 767px)' />
          <img src={LOGO_PC} alt='로고' />
        </picture>
      </Link>
    </StyledLogo>
  );
};

export default Logo;
