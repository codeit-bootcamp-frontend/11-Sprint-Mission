import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts, getProducts } from '@api/productsApi';
import { getPageLimit, useResize } from '@utills';
import { Product, ProductResponse } from '@apptypes/product';
import { DEFAULT_BEST_PRODUCT_COUNT } from '@constant';
import Header from '@common/home/Header';
import BestProducts from './BestProducts';
import AllProducts from './AllProducts';
import PageNavigation from './PageNavigation';
import '@styles/items.css';

function ItemsPage() {
  const [products, setProducts] = useState<Product[] | undefined>([]);
  const [bestProducts, setBestProduct] = useState<Product[]>([]);
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [bestProductsLimit, setBestProductsLimit] = useState<number>(4);
  const [productsLimit, setProductsLimit] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number | undefined>();
  const [searchQuery, setSearchQuery] = useState<string>('');

  useResize(() => {
    const pageLimit = getPageLimit();
    setBestProductsLimit(pageLimit[0]);
    setProductsLimit(pageLimit[1]);
  });

  useEffect(() => {
    async function fetchData() {
      const data: ProductResponse | undefined = await getAllProducts();

      const productData = data?.list;

      setTotalCount(data?.totalCount);

      if (productData) {
        productData.sort((a, b) => b.favoriteCount - a.favoriteCount);
        setBestProduct(productData.slice(0, DEFAULT_BEST_PRODUCT_COUNT));
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (totalCount) {
      setTotalPages(Math.ceil(totalCount / productsLimit));
    } else {
      setTotalCount(1);
    }
  }, [totalCount, productsLimit]);

  useEffect(() => {
    async function fetchData() {
      const data: ProductResponse | undefined = searchQuery
        ? await getProducts(currentPageNum, productsLimit, searchQuery)
        : await getProducts(currentPageNum, productsLimit);

      setProducts(data?.list);
      setTotalCount(data?.totalCount);
    }

    fetchData();
  }, [currentPageNum, productsLimit, searchQuery]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPageNum(1);
  }, []);

  return (
    <>
      <Header
        leftMenu={
          <>
            <Link to='/' className='menu-item free-board'>
              자유게시판
            </Link>
            <Link to='/items' className='menu-item secondhand-market'>
              중고마켓
            </Link>
          </>
        }
        rightMenu={
          <Link to='/mypage'>
            <img
              id='mypage'
              src='images/icons/ic_mypage.svg'
              alt='마이페이지 아이콘'
            />
          </Link>
        }
      />
      <main className='items-wrapper'>
        <BestProducts bestProducts={bestProducts.slice(0, bestProductsLimit)} />
        <AllProducts products={products} onSearch={handleSearch} />
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
