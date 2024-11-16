import ProfileImage from '../../components/ProfileImages/ProfileImage';
import Logo from '../../components/Shared/Logo/Logo';
import Navigation from '../Navigation/Navigation';
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
