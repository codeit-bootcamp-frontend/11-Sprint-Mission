import USER_PROFILE from '../../assets/ic-profile-default.png';
import StyledProfileContainer from './ProfileImage.styles';

const ProfileImage = ({ imageSize = 'big' }) => {
  return (
    <StyledProfileContainer imageSize={imageSize}>
      <img src={USER_PROFILE} alt='유저 프로필' />
    </StyledProfileContainer>
  );
};

export default ProfileImage;
