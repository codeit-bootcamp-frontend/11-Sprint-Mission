import { FormEvent, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import { getProductsList } from '@/services/products-api';
import useReSizing from '@/hooks/useReSizing';

import { Container, Page } from '@/styles/Common.styles';
import font from '@/styles/fontStyle.styles';
import { media } from '@/styles/media.styles';
import { flexColumn } from '@/styles/layout.styles';

import Button from '@/components/shared/Button';
import ProductsList from '@/components/pageComponents/items/ProductsList';
import SearchInput from '@/components/shared/SearchInput';
import SelectMenu from '@/components/shared/SelectMenu';
import NotResult from '@/components/shared/NotResult';
import PageNation from '@/components/shared/PageNation';

function ItemsPage() {
  const [order, setOrder] = useState<'recent' | 'favorite'>('recent');
  const [search, setSearch] = useState('');
  const [allItems, setAllItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<Error | null>(null);

  const pageSize = useReSizing({
    mobileSize: 4,
    tabletSize: 6,
    pcSize: 10,
  });

  const favoritePageSize = useReSizing({
    mobileSize: 1,
    tabletSize: 2,
    pcSize: 4,
  });

  // 전체 상품 목록 API 요청
  const fetchAllItems = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const result = await getProductsList({
        pageSize,
        keyword: search,
        orderBy: order,
        page: currentPage,
      });
      if (result) {
        setAllItems(result.list);
        setTotal(result.totalCount);
      }
    } catch (error) {
      setFetchError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [order, search, pageSize, currentPage]);

  // 좋아요 순 상품 목록 API 요청
  const fetchFavoriteItems = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const result = await getProductsList({
        pageSize: favoritePageSize,
        orderBy: 'favorite',
      });
      if (result) {
        setFavoriteItems(result.list);
      }
    } catch (error) {
      setFetchError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [favoritePageSize]);

  // API 요청 실행
  useEffect(() => {
    fetchAllItems();
  }, [fetchAllItems]);

  useEffect(() => {
    fetchFavoriteItems();
  }, [fetchFavoriteItems]);

  const handleSelect = (value: string) =>
    setOrder(value as 'recent' | 'favorite');

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchValue = (e.target as HTMLFormElement)['search'].value.trim();
    setSearch(searchValue);
  };

  const isEmpty = allItems.length === 0 && !fetchError && !isLoading;

  return (
    <StyledPageItem>
      <StyledContainer>
        <div>
          <div className='prod-title'>
            <h2>베스트 상품</h2>
          </div>
          <ProductsList list={favoriteItems} />
          {isLoading && <p>로딩 중 입니다...</p>}
          {fetchError && <span>에러가 발생했습니다</span>}
        </div>

        <div>
          <div className='prod-title toolbar'>
            <h2>전체 상품</h2>
            <SearchInput onSubmit={handleSearchSubmit} />
            <StyledItemButton href='/addItem' color='blue'>
              상품 등록하기
            </StyledItemButton>

            <SelectMenu
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
          {isLoading && <p>로딩 중 입니다...</p>}
          {fetchError && <span>에러가 발생했습니다</span>}
        </div>
      </StyledContainer>
    </StyledPageItem>
  );
}

export default ItemsPage;

const StyledPageItem = styled(Page)`
  h2 {
    ${font('20b')}
    color: var(--gray-900);
    flex: 1 1;
  }

  .prod-title {
    display: flex;
    align-items: center;
    margin-bottom: 1.6rem;
    gap: 1.2rem;
    &.toolbar {
      margin-bottom: 2.4rem;
    }
  }

  ${media.mo`
    .prod-title{
      flex-wrap: wrap;
      margin-bottom: 1.6rem;
      gap: .8rem 1.3rem;
        
    }
  `}
`;

const StyledContainer = styled(Container)`
  ${flexColumn}
  gap: 4rem;
`;

const StyledItemButton = styled(Button)`
  && {
    @media screen and (max-width: 767px) {
      order: 2;
    }
  }
`;
