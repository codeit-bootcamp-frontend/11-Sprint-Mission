import ProfileImage from '../../components/common/ProfileImage';
import Logo from '../../components/common/Logo';
import Navigation from '../Navigation';
import { HeaderContainer, StlyedContainer } from './Headers.styles';

const Headers = (props) => {
  return (
    <HeaderContainer>
      <StlyedContainer>
        <Logo />
        <Navigation />
        <ProfileImage />
      </StlyedContainer>
    </HeaderContainer>
  );
};

export default Headers;
