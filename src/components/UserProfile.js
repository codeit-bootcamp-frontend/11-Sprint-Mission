import "./UserProfile.css";
import avatar from "../image/user-avatar.png";

function UserProfile({ nickname, timestamp }) {
  return (
    <div className="profile">
      <img
        className="profile-avatar"
        src={avatar}
        alt={`${nickname}의 프로필`}
      />
      <div className="profile-info">
        <span className="profile-nickname">{nickname}</span>
        <span className="profile-timestamp">{timestamp}</span>
      </div>
    </div>
  );
}

export default UserProfile;
