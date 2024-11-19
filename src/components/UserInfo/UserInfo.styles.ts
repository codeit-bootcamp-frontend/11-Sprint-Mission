import styled from 'styled-components';
import font from '../../styles/fontStyle.styles';

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

export { UserInfoText, UserInfoWrapper, UserInfoName, UserInfoDate };
