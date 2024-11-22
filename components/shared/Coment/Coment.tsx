import UserInfo from '../UserInfo';
import styled from 'styled-components';
import DropDownMenu from '../DropDownMenu';
import font from '@/styles/fontStyle.styles';

export interface ComentProps {
  name: string;
  date: string;
  content: string;
  onClickEdit: () => void;
  onClickDelete: () => void;
}

function Coment({
  name,
  date,
  content,
  onClickEdit,
  onClickDelete,
}: ComentProps) {
  return (
    <ComentContainer>
      <ComentText>{content}</ComentText>
      <UserInfo wide>
        <UserInfo.ProfileImage imageSize='small' />
        <UserInfo.Text userName={name} date={date} column wide />
      </UserInfo>
      <ComentDropDown>
        <DropDownMenu.Item onClick={onClickEdit}>수정하기</DropDownMenu.Item>
        <DropDownMenu.Item onClick={onClickDelete}>삭제하기</DropDownMenu.Item>
      </ComentDropDown>
    </ComentContainer>
  );
}

export default Coment;

const ComentContainer = styled.div`
  position: relative;
`;

const ComentDropDown = styled(DropDownMenu)`
  position: absolute;
`;

const ComentText = styled.p`
  ${font('14')}
  margin-bottom: 1.6rem;
  padding-right: 2.8rem;
`;
