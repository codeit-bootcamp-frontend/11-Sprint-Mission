import { FormEvent, useState } from 'react';

import useProductsAll from '../../hooks/useProductsAll';
import useProductsFavorite from '../../hooks/useProductsFavorite';

import {
  StyledPageItem,
  StyledContainer,
  StyledItemButton,
} from './ItemsPage.styles';

import ProductsList from './ProductsList';
import PageNation from '../../components/PageNation/PageNation';
import SearchInput from '../../components/SearchInput/SearchInput';
import SeletMenu from '../../components/Select/SelectMenu';
import NotResult from '../../components/NotResult/NotResult';

function ItemsPage() {
  const [order, setOrder] = useState('recent');
  const [search, setSearch] = useState('');
  const {
    items: allItems,
    isLoading: productIsLoading,
    fetchError: productFetchError,
    total,
    currentPage,
    setCurrentPage,
    pageSize,
  } = useProductsAll({ order, search });
  const {
    items: favoriteItems,
    fetchError: favoriteFetchError,
    isLoading: favoriteIsLoading,
  } = useProductsFavorite();

  const handleSelect = (value: string) => setOrder(value);

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchValue = (e.target as HTMLFormElement)['search'].value.trim();
    setSearch(searchValue);
  };

  const isEmpty =
    allItems.length === 0 && !productFetchError && !productIsLoading;

  return (
    <StyledPageItem>
      <StyledContainer>
        <div>
          <div className='prod-title'>
            <h2>베스트 상품</h2>
          </div>
          <ProductsList list={favoriteItems} />
          {favoriteIsLoading && <p>로딩 중 입니다...</p>}
          {favoriteFetchError && <span>{favoriteFetchError}</span>}
        </div>

        <div>
          <div className='prod-title toolbar'>
            <h2>전체 상품</h2>
            <SearchInput onSubmit={handleSearchSubmit} />
            <StyledItemButton href='/addItem' color='blue'>
              상품 등록하기
            </StyledItemButton>

            <SeletMenu
              title='최신순'
              option={[
                { label: '최신순', value: 'recent', onSelect: handleSelect },
                {
                  label: '좋아요순',
                  value: 'favorite',
                  onSelect: handleSelect,
                },
              ]}
            />
          </div>
          {isEmpty ? (
            <NotResult type='search' />
          ) : (
            <>
              <ProductsList list={allItems} size='sm' />
              <PageNation
                total={total}
                pageSize={pageSize}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </>
          )}
          {productIsLoading && <p>로딩 중 입니다...</p>}
          {productFetchError && <span>{productFetchError}</span>}
        </div>
      </StyledContainer>
    </StyledPageItem>
  );
}

export default ItemsPage;
