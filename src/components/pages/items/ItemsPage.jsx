import ItemsHeader from "./ItemsHeader";
import "../../../styles/items.css";
import BestProducts from "./BestProducts";
import {
  getAllProducts,
  getProductsByPage,
} from "../../../api/items/productsApi.js";
import { useEffect, useState } from "react";
import AllProducts from "./AllProducts";
import PageNavigation from "./PageNavigation.jsx";
import { getPageLimit } from "../../../utills.js";

function ItemsPage() {
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProduct] = useState([]);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [bestProductsLimit, setBestProductsLimit] = useState(4);
  const [productsLimit, setProductsLimit] = useState(10);
  const [totalCount, setTotalCount] = useState();

  useEffect(() => {
    const handleResize = () => {
      const pageLimit = getPageLimit();
      setBestProductsLimit(pageLimit[0]);
      setProductsLimit(pageLimit[1]);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      <ItemsHeader />
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
