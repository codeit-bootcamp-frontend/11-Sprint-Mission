import AddProductInput from '../components/additem/AddProductInput';
import AdditemButton from '../components/additem/AdditemButton';
import { useState } from 'react';
import ImageUpload from '../components/additem/ImageUpload';

function Additem() {
  const [productName, setProductName] = useState('');
  const [productContent, setProductContent] = useState('');
  const [productPrice, setProductPrice] = useState(0);
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
      <p>상품 등록하기</p>
      <AdditemButton onSubmit={handleSubmit} />
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
    </>
  );
}

export default Additem;
