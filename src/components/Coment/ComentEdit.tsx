import { ChangeEvent, useState } from 'react';

import UserInfo from '../UserInfo/UserInfo';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { StyledEditForm } from './ComentEdit.styles';

interface ComentItem {
  content: string;
  writer: {
    nickname: string;
  };
  createdAt: string;
}

interface ComentEditProps {
  item: ComentItem;
  onCancel: () => void;
  onSubmit: (editValue: string) => void;
}

function ComentEdit({ item, onCancel, onSubmit }: ComentEditProps) {
  const [editValue, setEditValue] = useState(item.content);
  const hasEditValue = editValue.trim() !== '';

  const handleEditInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setEditValue(value);
  };

  return (
    <StyledEditForm>
      <Input as='textarea' value={editValue} onChange={handleEditInput} />
      <div className='coment-edit'>
        <UserInfo wide>
          <UserInfo.ProfileImage imageSize='small' />
          <UserInfo.Text
            userName={item.writer.nickname}
            date={item.createdAt}
            column
            wide
          />
        </UserInfo>
        <div className='coment-btnArea'>
          <Button color='none' onClick={onCancel}>
            취소
          </Button>
          <Button
            color={!hasEditValue ? 'gray' : 'blue'}
            disabled={!hasEditValue && editValue.length > 0}
            onClick={() => onSubmit(editValue)}>
            수정 완료
          </Button>
        </div>
      </div>
    </StyledEditForm>
  );
}

export default ComentEdit;
