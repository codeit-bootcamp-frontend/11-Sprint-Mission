import styled from 'styled-components';
import { formatRegistrationDate } from '@/utils/format';

import font from '@/styles/fontStyle.styles';
import { media } from '@/styles/media.styles';

import UserInfo from '@/components/shared/UserInfo';
const IMG_BEST = '/img_badge.svg';

interface Writer {
  nickname: string;
}

export interface BoardCardProps {
  title: string;
  likeCount: number;
  updatedAt: string;
  image: string;
  writer: Writer;
}

function BoardCard({
  title = '타이틀',
  likeCount = 0,
  updatedAt = '',
  writer = { nickname: '닉네임' },
  image = '',
}: BoardCardProps) {
  return (
    <BoardCardContainer>
      <BoardCardBestBege src={IMG_BEST} alt='Best 뱃지' />
      <BoardCardTitleArea>
        <h3>{title}</h3>
        <BoardCardProdImagesArea>
          <img src={image} alt='상품 이미지' />
        </BoardCardProdImagesArea>
      </BoardCardTitleArea>
      <UserInfo wide>
        <UserInfo.UserName userName={writer.nickname} />
        <UserInfo.Heart count={likeCount} size='sm' wide />
        <UserInfo.Date date={formatRegistrationDate(updatedAt)} />
      </UserInfo>
    </BoardCardContainer>
  );
}

const BoardCardContainer = styled.div`
  background-color: var(--gray-50);
  border-radius: 0.8rem;
  padding: 0 2.4rem 1.6rem;
  width: 38.4rem;
  height: auto;
  ${media.ta`
    width: 34rem;
  `}
  ${media.mo`
    width: 34.3rem;
  `}
`;

const BoardCardBestBege = styled.img`
  width: 10.2rem;
  height: 3rem;
  margin-bottom: 1.6rem;
`;

const BoardCardTitleArea = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: space-between;
  margin-bottom: 1.8rem;
  ${media.tamo`
    margin-bottom: 4rem;
    gap: 4rem;
  `}

  h3 {
    ${font('20sb')}
    ${media.tamo`
      ${font('18sb')}
    `}
  }
`;

export const BoardCardProdImagesArea = styled.div`
  width: 7.2rem;
  height: 7.2rem;
  border-radius: 0.6rem;
  overflow: hidden;
  border: 1px solid var(--gray-200);
`;

export default BoardCard;
