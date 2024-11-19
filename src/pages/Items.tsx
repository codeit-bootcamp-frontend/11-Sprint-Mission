import Header from "components/common/Header";
import BestProduct from "components/items/BestProductList";
import ProductList from "components/items/ProductList";

function Items() {
  return (
    <>
      <Header isLogin={true} />
      <main className='page-items'>
        <BestProduct />
        <ProductList />
      </main>
    </>
  );
}

export default Items;
