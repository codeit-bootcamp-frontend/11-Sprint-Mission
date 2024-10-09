import USER_PROFILE from "../../assets/ic-profile-default.png";

const ProfileImage = ({ size }) => {
  return (
    <div className='user-profile' style={size}>
      <img src={USER_PROFILE} alt='유저 프로필' />
    </div>
  );
};

export default ProfileImage;
