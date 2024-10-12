import "../../../styles/items.css";
import BestProducts from "./BestProducts";
import {
  getAllProducts,
  getProductsByPage,
} from "../../../api/items/productsApi.js";
import { useEffect, useState } from "react";
import AllProducts from "./AllProducts";
import PageNavigation from "./PageNavigation.jsx";
import { getPageLimit, useResize } from "../../../utills.js";
import Header from "../../common/auth/home/Header.jsx";
import { Link } from "react-router-dom";

function ItemsPage() {
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProduct] = useState([]);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [bestProductsLimit, setBestProductsLimit] = useState(4);
  const [productsLimit, setProductsLimit] = useState(10);
  const [totalCount, setTotalCount] = useState();

  useResize(() => {
    const pageLimit = getPageLimit();
    setBestProductsLimit(pageLimit[0]);
    setProductsLimit(pageLimit[1]);
  });

  useEffect(() => {
    async function fetchData() {
      const data = await getAllProducts();
      const productData = data.list;

      setTotalCount(data.totalCount);

      if (productData) {
        productData.sort((a, b) => b.favoriteCount - a.favoriteCount);
        setBestProduct(productData.slice(0, 4));
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (totalCount) {
      setTotalPages(Math.ceil(totalCount / productsLimit));
    }
  }, [totalCount]);

  useEffect(() => {
    async function fetchData() {
      const data = await getProductsByPage(currentPageNum, productsLimit);

      if (data) {
        setProducts(data);
      }
    }

    fetchData();
  }, [currentPageNum, productsLimit]);

  return (
    <>
      <Header
        leftMenu={
          <>
            <Link className="menu-item">자유게시판</Link>
            <Link className="menu-item">중고마켓</Link>
          </>
        }
        rightMenu={
          <Link to="/mypage">
            <img
              id="mypage"
              src="images/icons/ic_mypage.svg"
              alt="마이페이지 아이콘"
            />
          </Link>
        }
      />
      <main className="items-wrapper">
        <BestProducts bestProducts={bestProducts.slice(0, bestProductsLimit)} />
        <AllProducts products={products} />
      </main>

      <PageNavigation
        currentPage={currentPageNum}
        totalPages={totalPages}
        onPageChange={setCurrentPageNum}
      />
    </>
  );
}

export default ItemsPage;
