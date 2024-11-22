import styled from 'styled-components';
import { formatPrice } from '@/utils/format';

import { media } from '@/styles/media.styles';
import { flexColumn } from '@/styles/layout.styles';
import font from '@/styles/fontStyle.styles';

import DropDownMenu from '@/components/shared/DropDownMenu';
import TagsList from '@/components/shared/Tags/TagsList';
import UserInfo from '@/components/shared/UserInfo';
import Line from '@/components/shared/Line';
import ProdDefaultImages from './ProdDefaultImages';

interface ProdDetailProps {
  images?: string;
  prodName: string;
  price: number;
  desc: string;
  tags: string[];
  userName: string;
  createdAt: string;
  favoriteCount: number;
}

function ProdDetail({
  images,
  prodName,
  price,
  desc,
  tags,
  userName,
  createdAt,
  favoriteCount,
}: ProdDetailProps) {
  const hasImage = images && images.length > 0;

  return (
    <StyledProdContainer>
      <div className='prod-images'>
        {hasImage ? (
          <img src={images} alt={`${prodName} 이미지`} />
        ) : (
          <ProdDefaultImages />
        )}
      </div>
      <div className='prod-info'>
        <div className='prod-info-area'>
          <div className='prod-title-area'>
            <div className='prod-title-text'>
              <h2>{prodName}</h2>
              <p>{formatPrice(price)}원</p>
              <DropDownMenu>
                <DropDownMenu.Item onClick={() => {}}>
                  수정하기
                </DropDownMenu.Item>
                <DropDownMenu.Item onClick={() => {}}>
                  삭제하기
                </DropDownMenu.Item>
              </DropDownMenu>
            </div>
            <Line />
          </div>
          <div className='prod-text-area'>
            <div className='prod-text'>
              <h3>상품 소개</h3>
              <p>{desc}</p>
            </div>
            <div className='prod-text'>
              <h3>상품 태그</h3>
              <TagsList tags={tags} />
            </div>
          </div>
        </div>
        <div className='prod-userInfo'>
          <UserInfo wide>
            <UserInfo.ProfileImage imageSize='big' />
            <UserInfo.Text userName={userName} date={createdAt} column wide />
            <UserInfo.Line column />
            <UserInfo.Heart borderType count={favoriteCount} />
          </UserInfo>
        </div>
      </div>
    </StyledProdContainer>
  );
}

export default ProdDetail;

const StyledProdContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2.4rem;
  ${media.mo`
  flex-direction: column;
  `}

  h2, h3 {
    margin-bottom: 1.6rem;
    ${media.tamo`
      margin-bottom: .8rem;
    `}
  }

  .prod {
    &-images {
      width: 48.6rem;
      height: 48.6rem;
      border-radius: 1.6rem;
      overflow: hidden;
      object-fit: cover;

      ${media.tamo`
        width: 34.3rem;
        height: 34.3rem;
      `}
    }
    &-info {
      position: relative;
      ${flexColumn}
      justify-content: space-between;
      width: 69rem;
      ${media.tamo`
        width: 34rem;
        gap: 4rem;
      `}

      &-area {
        ${flexColumn}
        gap: 2.4rem;
        ${media.tamo`
          gap: 1.6rem;
        `}
      }
    }

    &-title {
      &-area {
        ${flexColumn}
        gap: 1.6rem;
      }
      &-text {
        position: relative;
        h2 {
          ${font('24sb')}
          ${media.ta`
            ${font('20sb')}
          `}
          ${media.mo`
            ${font('16sb')}
          `}
        }
        p {
          ${font('40sb')}
          ${media.ta`
            ${font('32sb')}
          `}
          ${media.mo`
            ${font('24sb')}
          `}
        }
      }
    }

    &-text {
      &-area {
        ${flexColumn}
        gap: 2.4rem;
      }
      > * {
        color: var(--gray-600);
      }
      h3 {
        ${font('16sb')}
        ${media.ta`
          ${font('14sb')}
        `}
      }
      p {
        ${font('16')}
      }
    }

    &-userInfo {
      ${media.ta`
        margin-top: 1.6rem;
      `}
    }
  }
`;

const IconReturn = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;
