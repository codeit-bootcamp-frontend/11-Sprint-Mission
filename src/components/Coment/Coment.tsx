import UserInfo from '../UserInfo/UserInfo';
import { ComentContainer, ComentDropDown, ComentText } from './Coment.styles';
import DropDownMenu from '../DropDownMenu/DropDownMenu';

interface ComentProps {
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
        <DropDownMenu.Item onClick={onClickEdit} className='btn-remove'>
          수정하기
        </DropDownMenu.Item>
        <DropDownMenu.Item onClick={onClickDelete} className='btn-delete'>
          삭제하기
        </DropDownMenu.Item>
      </ComentDropDown>
    </ComentContainer>
  );
}

export default Coment;
