import Line from '../Shared/Line/Line';
import ProfileImage from '../ProfileImages/ProfileImage';
import {
  UserInfoText,
  UserInfoWrapper,
  UserInfoName,
  UserInfoDate,
} from './UserInfo.styles';
import Heart from '../HeartButton/Heart';
import { formatRegistrationDate } from '../../utils/format';
import { ReactNode } from 'react';

// UserInfo 컴포넌트의 prop 타입 정의
interface UserInfoProps {
  children: ReactNode;
  wide?: boolean;
}

// 하위 컴포넌트 prop 타입 정의
interface ProfileImageProps {
  imageSize?: 'small' | 'big';
}

interface UserNameProps {
  userName?: string;
}

interface DateProps {
  date?: string;
}

interface UserInfoTextProps {
  userName?: string;
  date?: string;
  column?: boolean;
  wide?: boolean;
}

interface LineProps {
  column?: boolean;
}

interface HeartProps {
  borderType?: boolean;
  count: number;
  size?: 'sm' | 'md';
  wide?: boolean;
}

function UserInfo({ children, wide }: UserInfoProps) {
  return <UserInfoWrapper wide={wide}>{children}</UserInfoWrapper>;
}

// ProfileImage 컴포넌트
UserInfo.ProfileImage = function ProfileImageComponent({
  imageSize,
}: ProfileImageProps) {
  return <ProfileImage imageSize={imageSize} />;
};

// UserName 컴포넌트
UserInfo.UserName = function UserNameComponent({
  userName = '유저이름',
}: UserNameProps) {
  return <UserInfoName>{userName}</UserInfoName>;
};

// Date 컴포넌트
UserInfo.Date = function DateComponent({ date = '2024. 01. 01' }: DateProps) {
  return <UserInfoDate>{formatRegistrationDate(date)}</UserInfoDate>;
};

// UserInfoText 컴포넌트
UserInfo.Text = function UserInfoTextComponent({
  userName,
  date,
  column = false,
  wide = false,
}: UserInfoTextProps) {
  return (
    <UserInfoText column={column} wide={wide}>
      <UserInfo.UserName userName={userName} />
      <UserInfo.Date date={date} />
    </UserInfoText>
  );
};

// Line 컴포넌트
UserInfo.Line = function LineComponent({ column }: LineProps) {
  return <Line column={column} className='user-Line' />;
};

// Heart 컴포넌트
UserInfo.Heart = function HeartComponent({
  borderType,
  count,
  size,
  wide,
}: HeartProps) {
  return (
    <Heart borderType={borderType} count={count} size={size} wide={wide} />
  );
};

// UserInfo를 기본 내보내기로 설정
export default UserInfo;
