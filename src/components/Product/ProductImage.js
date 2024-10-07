import { useProductSettings } from "../../context/ProductContext";

const ProductImage = ({ images }) => {
  const { imageSize } = useProductSettings();
  return (
    <div className={`product-images ${imageSize}`}>
      <img src={images} alt='' />
    </div>
  );
};

export default ProductImage;
