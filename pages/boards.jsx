import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BestBoard from '@/components/BestBoard'
import EntireBoard from '@/components/EntireBoard';
import SmallButton from '@/components/common/SmallButton';
import axios from '@/pages/api/api';
import search from '@/public/ic_search.svg';
import styles from '@/styles/Boards.module.css';

export default function Boards() {
  const [entireList, setEntireList] = useState([]);
  const [bestList, setBestList] = useState([]);
  const [orderBy, setOrderBy] = useState('recent'); // 추가된 state
  const [searchKeyword, setSearchKeyword] = useState('');

  const getList = async ({ page = 1, pageSize = 10, orderBy = 'recent', keyword = '' }) => {
    const params = {
      page,
      pageSize,
      orderBy,
      keyword,
    };

    try {
      const { data } = await axios.get('/articles', { params });
      return data; // 데이터 반환
    } catch (error) {
      console.error('API 호출 실패:', error);
      alert(error.message);
      return null; // 실패 시 null 반환
    }
  };

  const fetchBestData = useCallback(async param => {
    const data = await getList(param); // 비동기 호출 후 대기

    if (data && Array.isArray(data.list)) {
      // null, array체크후 setstate
      // console.log(data.list);
      setBestList(data.list);
    } else {
      setBestList([]);
    }
    // console.log(data);
  }, []);

  const fetchEntireData = useCallback(async param => {
    const data = await getList(param); // 비동기 호출 후 대기

    if (data && Array.isArray(data.list)) {
      setEntireList(data.list);
    } else {
      setEntireList([]);
    }
  }, []);

  const handleChange = async e => {
    const selectedOrderBy = e.target.value;
    setOrderBy(selectedOrderBy);

    // 검색 키워드와 정렬 순서를 기반으로 전체 리스트 업데이트
    await fetchEntireData({ keyword: searchKeyword, orderBy: selectedOrderBy });
  };

  const handleInputChange = async e => {
    const value = e.target.value || '';
    setSearchKeyword(value);

    // 검색 키워드와 정렬 순서를 기반으로 전체 리스트 업데이트
    await fetchEntireData({ keyword: value, orderBy });
  };

  useEffect(() => {
    fetchBestData({ pageSize: 3 }); // 베스트 호출
    fetchEntireData({ orderBy: 'recent' }); // 일반 조회
  }, [fetchBestData, fetchEntireData]);

  return (
    <div className={styles.boardsPage}>
      <section className={styles.bestBoardContainer}>
        <h2 className={styles.bestBoardTitle}>베스트 게시글</h2>
        <div className={styles.bestBoardCard}>
          {bestList.map(data => {
            return (
              <li key={data.id} className={styles.boardCard}>
                <Link href={`/board/${data.id}`} className={styles.boardCard}>
                  <BestBoard {...data} />
                </Link>
              </li>
            );
          })}
        </div>
      </section>
      <section className={styles.entireBoardContainer}>
        <div className={styles.entireBoardHeader}>
          <h2 className={styles.entireBoardTitle}>게시글</h2>
          <Link href="/addboard">
            <SmallButton type="button">글쓰기</SmallButton>
          </Link>
        </div>
        <div className={styles.entireBoardBody}>
          <div className={styles.userSelectSection}>
            <div className={styles.searchBar}>
              <Image width={'15'} height={'15'} src={search} alt="검색" className={styles.searchBarImage}/>
              <input value={searchKeyword} onChange={handleInputChange} placeholder="검색할 상품을 입력해주세요." className={styles.searchBarInput} />
            </div>
            <select value={orderBy} onChange={handleChange}>
              <option value="recent">최신순</option>
              <option value="like">좋아요순</option>
            </select>
          </div>
          <div className={styles.entireBoardList}>
            {entireList?.length > 0 ? (
              entireList.map(data => (
                <li key={data.id} className={styles.boardCard}>
                  <Link href={`/board/${data.id}`} className={styles.boardCard}>
                    <EntireBoard data={data} />
                  </Link>
                </li>
              ))
            ) : (
              <div> 아직 게시글이 없습니다. 첫번째 게시글을 작성해 주세요!</div> // 전체 리스트가 없을 때 출력될 메시지
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
