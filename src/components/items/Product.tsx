import Image from "components/common/Image";
import { Link } from "react-router-dom";
import { formatPriceToKRW } from "utils/formatPrice";
import { ProductInterface } from "./ProductList";

function Product({ product }: { product: ProductInterface }) {
  const { id, name, price, favoriteCount, images } = product;
  const formattedPrice = formatPriceToKRW(price);

  return (
    <Link to={`/items/${id}`} title={`${name} 상세보기`}>
      <div className='product'>
        <Image images={images} name={name} />
        <div className='desc-wrap'>
          <h3 className='product-name'>{name}</h3>
          <div className='product-price'>{formattedPrice}</div>
          <div className='product-favorite'>
            <img src='/images/icons/ic_heart.svg' alt='하트' />
            <span>{favoriteCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Product;
