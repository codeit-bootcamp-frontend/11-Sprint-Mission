import styled from 'styled-components';

const USER_PROFILE = '/ic-profile-default.png';

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

const StyledProfileContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['imageSize'].includes(prop),
})<ProfileImageProps>`
  position: relative;
  ${({ imageSize }) => {
    if (imageSize === 'big') {
      return 'width: 4rem; height: 4rem;';
    } else {
      return 'width: 3.2rem; height: 3.2rem;';
    }
  }}
`;
