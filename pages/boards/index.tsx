import { FormEvent, useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import useReSizing from '@/hooks/useReSizing';
import { getBoardList } from '@/services/boards-api';

import { Page, Container } from '@/styles/Common.styles';
import { flexColumn } from '@/styles/layout.styles';
import font from '@/styles/fontStyle.styles';
import { media } from '@/styles/media.styles';

import Button from '@/components/shared/Button';
import BoardCardList from '@/components/pages/boards/BoardCardList';
import SearchInput from '@/components/shared/SearchInput';
import BoardList from '@/components/pages/boards/BoardList';
import SelectMenu from '@/components/shared/SelectMenu';

function BoardsPage() {
  const [order, setOrder] = useState<'recent' | 'like'>('recent');
  const [search, setSearch] = useState('');
  const [allItems, setAllItems] = useState([]);
  const [bestBoardList, setBestBoardList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<Error | null>(null);

  const pageBestSize = useReSizing({
    mobileSize: 1,
    tabletSize: 2,
    pcSize: 3,
  });

  // 베스트 게시글
  const fetchBoardFavoriteItems = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const result = await getBoardList({
        pageSize: pageBestSize,
        orderBy: 'like',
      });
      if (result) {
        setBestBoardList(result.list);
      }
    } catch (error) {
      setFetchError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [pageBestSize]);

  const fetchBoardAllItems = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const result = await getBoardList({
        keyword: search,
        orderBy: order,
      });
      if (result) {
        setAllItems(result.list);
      }
    } catch (error) {
      setFetchError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [order, search]);

  useEffect(() => {
    fetchBoardFavoriteItems();
  }, [fetchBoardFavoriteItems]);
  useEffect(() => {
    fetchBoardAllItems();
  }, [fetchBoardAllItems]);

  const handleSelect = (value: string) => setOrder(value as 'recent' | 'like');

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchValue = (e.target as HTMLFormElement)['search'].value.trim();
    setSearch(searchValue);
  };

  return (
    <BoardPage>
      <BoardPageContainer>
        <div>
          <BoardTitleArea>
            <h2>베스트 게시글</h2>
          </BoardTitleArea>
          <BoardCardList list={bestBoardList} />
          {isLoading && <p>로딩 중 입니다...</p>}
          {fetchError && <span>에러가 발생했습니다</span>}
        </div>
        <div>
          <BoardTitleArea>
            <h2>게시글</h2>
            <Button href='/addboard' color='blue'>
              글쓰기
            </Button>
          </BoardTitleArea>
          <BoardTitleArea>
            <SearchInput onSubmit={handleSearchSubmit} wide />
            <SelectMenu
              title='최신순'
              option={[
                { label: '최신순', value: 'recent', onSelect: handleSelect },
                {
                  label: '좋아요순',
                  value: 'like',
                  onSelect: handleSelect,
                },
              ]}
            />
          </BoardTitleArea>
          <BoardList list={allItems} />
        </div>
      </BoardPageContainer>
    </BoardPage>
  );
}

const BoardPage = styled(Page)`
  background-color: #fff;
`;

const BoardPageContainer = styled(Container)`
  ${flexColumn}
  gap: 4rem;
  ${media.tamo`
  gap: 2.4rem;
  
  `}
`;

const BoardTitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.6rem;
  margin-bottom: 2.4rem;
  ${media.ta`
  gap: .6rem;
  `}
  ${media.mo`
  gap: 1.3rem;
  margin-bottom: 1.6rem;
  `}
  h2 {
    ${font('20b')}
    ${media.mo`
    ${font('18b')}
    `}
  }
`;

export default BoardsPage;
