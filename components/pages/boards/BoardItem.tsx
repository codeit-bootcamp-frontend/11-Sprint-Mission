import { styled } from 'styled-components';
import { formatRegistrationDate } from '@/utils/format';

import font from '@/styles/fontStyle.styles';
import { media } from '@/styles/media.styles';
import { flexColumn } from '@/styles/layout.styles';

import { BoardCardProdImagesArea, BoardCardProps } from './BoardCard';
import UserInfo from '@/components/shared/UserInfo';
import Line from '@/components/shared/Line';

function BoardItem({
  title = '타이틀',
  likeCount = 0,
  updatedAt = '',
  writer = { nickname: '닉네임' },
  image = '',
}: BoardCardProps) {
  return (
    <BoardItemContainer>
      <div>
        <BoardItemTitleArea>
          <h3>{title}</h3>
          <BoardCardProdImagesArea>
            <img src={image} alt='상품 이미지' />
          </BoardCardProdImagesArea>
        </BoardItemTitleArea>
        <UserInfo wide>
          <UserInfo.ProfileImage imageSize='small' />
          <UserInfo.Text
            userName={writer.nickname}
            date={formatRegistrationDate(updatedAt)}
            wide
          />
          <UserInfo.Heart count={likeCount} />
        </UserInfo>
      </div>
      <Line />
    </BoardItemContainer>
  );
}

const BoardItemContainer = styled.div`
  ${flexColumn}
  gap: 2.4rem;
  background-color: #fcfcfc;
`;

const BoardItemTitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.6rem;
  gap: 0.8rem;
  h3 {
    ${font('20sb')}
    ${media.mo`
      ${font('18sb')}
    `}
  }
`;

export default BoardItem;
