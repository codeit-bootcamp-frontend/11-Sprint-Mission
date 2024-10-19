import { Details, UserStats } from "./ProductDetails.style";

import ProductHead from "./ProductHead";
import ProductDescription from "./ProductDescription";
import ProductTag from "./ProductTag";
import Profile from "./Profile";
import Likes from "./Likes";

const ProductDetails = ({ item }) => {
  return (
    <Details>
      <ProductHead item={item} />

      <ProductDescription item={item} />

      {item.tags.length > 0 && <ProductTag item={item} />}

      <UserStats>
        <Profile nickname={item.ownerNickname} updatedAt={item.updatedAt} />
        <Likes item={item} />
      </UserStats>
    </Details>
  );
};

export default ProductDetails;
