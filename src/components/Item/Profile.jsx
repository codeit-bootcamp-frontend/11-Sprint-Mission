import profileImg from "../../assets/profileImg.svg";

import { ProfileWrapper, Img, Info } from "./Profile.style";

const Profile = ({ nickname, createdAt }) => {
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <ProfileWrapper>
      <Img>
        <img src={profileImg} alt="프로필 이미지" />
      </Img>
      <Info>
        <p>{nickname}</p>
        <span>{formattedDate}</span>
      </Info>
    </ProfileWrapper>
  );
};

export default Profile;
