import Image from "components/common/Image";
import { formatDate } from "utils/formatDate";
import { formatPriceToKRW } from "utils/formatPrice";

interface Props {
  name: string;
  description: string;
  images: string[];
  price: number;
  favoriteCount: number;
  tags: string[];
  ownerNickname: string;
  updatedAt: string;
  isFavorite?: boolean;
}

function DetailProduct({
  name,
  description,
  images,
  price,
  favoriteCount,
  tags,
  ownerNickname,
  updatedAt,
  isFavorite,
}: Props) {
  return (
    <div className='product-detail-contents'>
      <Image images={images} name={name} />
      <div className='desc-wrap'>
        <h2 className='detail-name'>{name}</h2>
        <div className='detail-price'>{formatPriceToKRW(price)}</div>
        <div className='detail-description-wrap'>
          <div className='detail-description-title'>상품 소개</div>
          <p className='detail-description'>{description}</p>
        </div>
        <div className='detail-tag-wrap'>
          <div className='detail-tag-title'>상품 태그</div>
          <div className='detail-tags'>
            {tags.map((tag) => (
              <span key={tag} className='detail-tag'>
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <div className='detail-footer'>
          <div className='owner-wrap'>
            <div className='owner-icon'>
              <img src='/images/icons/ic_user_login.svg' alt={ownerNickname} />
            </div>
            <div className='owner-desc'>
              <div className='owner-name'>{ownerNickname}</div>
              <div className='date-update'>{formatDate(updatedAt)}</div>
            </div>
          </div>
          <button className='btn-favorite'>
            <img
              src={`/images/icons/ic_favorite${
                isFavorite ? "_active" : ""
              }.svg`}
              alt='favorite'
            />
            <span>{favoriteCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
