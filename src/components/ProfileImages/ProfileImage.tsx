import USER_PROFILE from '/ic-profile-default.png';
import StyledProfileContainer from './ProfileImage.styles';

export interface ProfileImageProps {
  imageSize?: 'small' | 'big';
}

const ProfileImage = ({ imageSize = 'big' }: ProfileImageProps) => {
  return (
    <StyledProfileContainer imageSize={imageSize}>
      <img src={USER_PROFILE} alt='유저 프로필' />
    </StyledProfileContainer>
  );
};

export default ProfileImage;
