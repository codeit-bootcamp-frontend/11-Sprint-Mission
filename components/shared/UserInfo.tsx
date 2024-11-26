import { ReactNode } from 'react';
import styled from 'styled-components';
import { formatRegistrationDate } from '../../utils/format';

import font from '@/styles/fontStyle.styles';

import Heart from './HeartButton/Heart';
import ProfileImage from './ProfileImage';
import Line from './Line';

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

// UserInfoText의 prop 타입 정의
interface UserInfoTextProps {
  column?: boolean;
  wide?: boolean;
}

// UserInfoWrapper의 prop 타입 정의
interface UserInfoWrapperProps {
  wide?: boolean;
}

// UserInfoText 컴포넌트
const UserInfoText = styled.div.withConfig({
  shouldForwardProp: (prop) => !['column', 'wide'].includes(prop),
})<UserInfoTextProps>`
  display: flex;
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};
  gap: ${({ column }) => (column ? '.2rem' : '0.8rem')};
  flex: ${({ wide }) => (wide ? '1' : 'initial')};

  .user-Line {
    height: 3.4rem;
  }
`;

// UserInfoName 컴포넌트
const UserInfoName = styled.p`
  ${font('14m')}
  color: var(--gray-600);
`;

// UserInfoDate 컴포넌트
const UserInfoDate = styled.span`
  ${font('14')}
  color: var(--gray-400);
`;

// UserInfoWrapper 컴포넌트
const UserInfoWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['wide'].includes(prop),
})<UserInfoWrapperProps>`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  width: ${({ wide }) => (wide ? '100%' : 'auto')};
`;
