import { useState } from "react";
import Button from "../components/Button";
import HeartCountArea from "../components/HeartCountArea";
import ProductImage from "../components/Product/ProductImage";
import ProductName from "../components/Product/ProductName";
import ProductPrice from "../components/Product/ProductPrice";
import "../styles/Products/ProductsList.css";

const ProductItem = ({ item, imageSize, countSize }) => {
  return (
    <>
      <ProductImage images={item.images} size={imageSize} />
      <div className='product-content'>
        <ProductName name={item.name} />
        <ProductPrice price={item.price} />
        <HeartCountArea count={item.favoriteCount} size={countSize} />
      </div>
    </>
  );
};

const SearchInput = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className='input-search-wrap'>
      <input className='input-search' name='search' placeholder='검색할 상품을 입력해주세요' />
    </form>
  );
};

const DropDown = () => {
  const [isOption, setIsOption] = useState(false);
  const handleOptionClick = () => {
    setIsOption(!isOption);
  };
  return (
    <div className='select'>
      <button className='select-title' value='favorite' onClick={handleOptionClick}>
        최신순
      </button>
      {isOption ? (
        <div className='select-option'>
          <button className='select-option-list' value='favorite'>
            최신순
          </button>
          <button className='select-option-list' value='recent'>
            좋아요순
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

const ProductManagement = ({ onSubmit }) => {
  return (
    <>
      <SearchInput onSubmit={onSubmit} />
      <Button link={true} href='/additem' className='additem' style='square blue'>
        상품 등록하기
      </Button>
      <DropDown />
    </>
  );
};

const ProductsList = ({ list, imageSize, countSize, children, onSubmit, productManagement }) => {
  return (
    <div className='product-area'>
      <div className='product-category'>
        <h2 className='product-category-name'>{children}</h2>
        {productManagement ? <ProductManagement onSubmit={onSubmit} /> : ""}
      </div>
      <ul className='product-list'>
        {list.map((item) => (
          <li key={item.id} className='product-item'>
            <ProductItem item={item} imageSize={imageSize} countSize={countSize} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
