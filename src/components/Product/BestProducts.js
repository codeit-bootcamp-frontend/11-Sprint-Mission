import useProductsFavorite from "../../hooks/useProductsFavorite";
import ProductsList from "../../layout/ProductsList";

const BestProducts = () => {
  const { items, loadingError, isLoading } = useProductsFavorite();

  return (
    <>
      {loadingError?.message && <span>{loadingError.message}</span>}
      <ProductsList
        list={items}
        imageSize='large'
        countSize='small'
        productManagement={false}
        isLoading={isLoading}
        className='best'
      >
        베스트 상품
      </ProductsList>
    </>
  );
};

export default BestProducts;
