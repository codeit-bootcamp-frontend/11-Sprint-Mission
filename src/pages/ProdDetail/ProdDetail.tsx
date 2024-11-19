import { formatPrice } from '../../utils/format';

import { StyledProdContainer } from './ProdDetail.styles';

import TagsList from '../../components/Tags/TagsList';
import DropDownMenu from '../../components/DropDownMenu/DropDownMenu';
import UserInfo from '../../components/UserInfo/UserInfo';
import Line from '../../components/Shared/Line/Line';
import ProdDefaultImages from '../../components/ProdCard/ProdDefaultImages';

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
