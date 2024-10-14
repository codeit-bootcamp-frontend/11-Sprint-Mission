const ProductCard = ({ product }) => {
  return (
    <div className="ProductCard">
      <img className="ProductCard-img" src={product.images[0]} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.price}</p>
      <p>{product.favoriteCount}</p>
    </div>
  );
};

export default ProductCard;
