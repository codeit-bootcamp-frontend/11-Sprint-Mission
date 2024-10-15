import USER_PROFILE from "../../assets/ic-profile-default.png";
import styles from "./ProfileImage.module.scss";

const ProfileImage = ({ imageSize = "" }) => {
  return (
    <div className={`${styles["user-profile"]} ${styles[imageSize]}`}>
      <img src={USER_PROFILE} alt="유저 프로필" />
    </div>
  );
};

export default ProfileImage;
