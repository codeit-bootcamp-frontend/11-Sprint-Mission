import Head from "./ProductHead.style";

const ProductHead = ({ item }) => {
  return (
    <Head>
      <h2>{item.name}</h2>
      <p>{item.price.toLocaleString()}원</p>
    </Head>
  );
};

export default ProductHead;
