import UserInfo from '../UserInfo';
import styled from 'styled-components';
import DropDownMenu from '../DropDownMenu';
import font from '@/styles/fontStyle.styles';

export interface CommentProps {
  name: string;
  date: string;
  content: string;
  onClickEdit: () => void;
  onClickDelete: () => void;
}

function Comment({ name, date, content, onClickEdit, onClickDelete }: CommentProps) {
  return (
    <CommentContainer>
      <CommentText>{content}</CommentText>
      <UserInfo wide>
        <UserInfo.ProfileImage imageSize='small' />
        <UserInfo.Text userName={name} date={date} column wide />
      </UserInfo>
      <CommentDropDown>
        <DropDownMenu.Item onClick={onClickEdit}>수정하기</DropDownMenu.Item>
        <DropDownMenu.Item onClick={onClickDelete}>삭제하기</DropDownMenu.Item>
      </CommentDropDown>
    </CommentContainer>
  );
}

export default Comment;

const CommentContainer = styled.div`
  position: relative;
`;

const CommentDropDown = styled(DropDownMenu)`
  position: absolute;
`;

const CommentText = styled.p`
  ${font('14')}
  margin-bottom: 1.6rem;
  padding-right: 2.8rem;
`;
