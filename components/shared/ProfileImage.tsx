import styled from 'styled-components';
import Image from 'next/image';

const USER_PROFILE = '/ic-profile-default.png';

export interface ProfileImageProps {
  imageSize?: 'small' | 'big';
}

const ProfileImage = ({ imageSize = 'big' }: ProfileImageProps) => {
  return (
    <StyledProfileContainer imageSize={imageSize}>
      <Image src={USER_PROFILE} alt='유저 프로필' width={40} height={40} />
    </StyledProfileContainer>
  );
};

export default ProfileImage;

const StyledProfileContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['imageSize'].includes(prop),
})<ProfileImageProps>`
  ${({ imageSize }) => {
    if (imageSize === 'big') {
      return 'width: 4rem; height: 4rem;';
    } else {
      return 'width: 3.2rem; height: 3.2rem;';
    }
  }}
`;
