import profileImg from "../../assets/profileImg.svg";

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile-img">
        <img src={profileImg} alt="프로필 이미지" />
      </div>
      <div>
        <p>시니철</p>
        <span>2024. 01. 01</span>
      </div>
    </div>
  );
};

export default Profile;
