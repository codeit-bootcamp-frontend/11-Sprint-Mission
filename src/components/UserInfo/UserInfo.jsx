import Line from '../Shared/Line/Line';
import ProfileImage from '../ProfileImages/ProfileImage';
import {
  UserInfoText,
  UserInfoWrapper,
  UserInfoName,
  UserInfoDate,
} from './UserInfo.styles';
import Heart from '../HeartButton/HeartButton';
import { formatRegistrationDate } from '../../utils/format';

function UserInfo({ children, wide }) {
  return <UserInfoWrapper wide={wide}>{children}</UserInfoWrapper>;
}

UserInfo.ProfileImage = function ProfileImageComponent({ imageSize }) {
  return <ProfileImage imageSize={imageSize} />;
};

UserInfo.UserName = function UserNameComponent({ userName = '유저이름' }) {
  return <UserInfoName>{userName}</UserInfoName>;
};

UserInfo.Date = function DateComponent({ date = '2024. 01. 01' }) {
  return <UserInfoDate>{formatRegistrationDate(date)}</UserInfoDate>;
};

UserInfo.Text = function UserInfoTextComponent({
  userName,
  date,
  column = false,
  wide = false,
}) {
  return (
    <UserInfoText column={column} wide={wide}>
      <UserInfo.UserName userName={userName} />
      <UserInfo.Date date={date} />
    </UserInfoText>
  );
};

UserInfo.Line = function LineComponent({ column }) {
  return <Line column={column} className='user-Line' />;
};

UserInfo.Heart = function HeartComponent({ borderType, count, size, wide }) {
  return (
    <Heart borderType={borderType} count={count} size={size} wide={wide} />
  );
};

// UserInfo를 기본 내보내기로 설정
export default UserInfo;
