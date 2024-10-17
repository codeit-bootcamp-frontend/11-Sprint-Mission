import profileImg from "../../assets/profileImg.svg";

import "./Profile.css";

const Profile = ({ nickname, createdAt }) => {
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className="profile">
      <div className="profile-img">
        <img src={profileImg} alt="프로필 이미지" />
      </div>
      <div>
        <p>{nickname}</p>
        <span>{formattedDate}</span>
      </div>
    </div>
  );
};

export default Profile;
