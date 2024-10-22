import "./UserInfo.css";
import Profile from "../assets/icons/ic_profile.svg";

function UserInfo({ image, nickname, time, type }) {
  return (
    <div className={`UserInfo ${type}`}>
      <div className={`UserInfo__imgWrapper ${type}`}>
        <img
          src={image ? image : Profile}
          alt="profile"
          className="UserInfo__img"
        />
      </div>
      <div className={`UserInfo__textContainer ${type}`}>
        <p className={`UserInfo__nickname ${type}`}>{nickname}</p>
        <p className={`UserInfo__time ${type}`}>{time}</p>
      </div>
    </div>
  );
}

export default UserInfo;
