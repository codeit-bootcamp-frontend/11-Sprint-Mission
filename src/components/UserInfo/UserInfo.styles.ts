import styled from 'styled-components';
import font from '../../styles/fontStyle.styles';

const UserInfoText = styled.div.withConfig({
  shouldForwardProp: (prop) => !['column', 'wide'].includes(prop),
})`
  display: flex;
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};
  gap: ${({ column }) => (column ? '.2rem' : '0.8rem')};
  flex: ${({ wide }) => wide && '1'};

  .user-Line {
    height: 3.4rem;
  }
`;

const UserInfoName = styled.p`
  ${font('14m')}
  color: var(--gray-600);
`;

const UserInfoDate = styled.span`
  ${font('14')}
  color: var(--gray-400);
`;

const UserInfoWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['wide'].includes(prop),
})`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  width: ${({ wide }) => wide && '100%'};
`;

export { UserInfoText, UserInfoWrapper, UserInfoName, UserInfoDate };
