const ProductImage = ({ images, size }) => {
  return (
    <div className={`product-images ${size}`}>
      <img src={images} alt='' />
    </div>
  );
};

export default ProductImage;
