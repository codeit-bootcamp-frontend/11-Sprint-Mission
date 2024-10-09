import AddProductInput from '../components/additem/AddProductInput';
import AdditemButton from '../components/additem/AdditemButton';
import { useState } from 'react';
import ImageUpload from '../components/additem/ImageUpload';
import '../styles/additem/additem.css';

function Additem() {
  const [productName, setProductName] = useState('');
  const [productContent, setProductContent] = useState('');
  const [productPrice, setProductPrice] = useState();
  const [productTag, setProductTag] = useState('');
  const [productImage, setProductImage] = useState(null);

  const handleSubmit = () => {
    const productData = {
      productImage,
      productName,
      productContent,
      productPrice,
      productTag,
    };
    console.log('상품 등록 데이터:', productData);
  };

  const handleImageChange = (name, file) => {
    setProductImage(file);
  };

  return (
    <>
      <div className="container">
        <div className="subHeader">
          <p className="subTitle">상품 등록하기</p>
          <AdditemButton onSubmit={handleSubmit} />
        </div>
        <p className="cantainerImageTitle">상품 이미지</p>
        <ImageUpload
          name={productImage}
          value={productImage}
          onChange={handleImageChange}
        />
        <AddProductInput
          productName={productName}
          productContent={productContent}
          productPrice={productPrice}
          productTag={productTag}
          onNameChange={setProductName}
          onContentChange={setProductContent}
          onPriceChange={setProductPrice}
          onTagChange={setProductTag}
        />
      </div>
    </>
  );
}

export default Additem;
