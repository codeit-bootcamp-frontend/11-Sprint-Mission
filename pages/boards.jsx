// boards.jsx
import { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import search from '@/public/ic_search.svg';
import BestBoard from '../components/BestBoard';
import EntireBoard from '../components/EntireBoard';
import axios from '@/pages/api/api';
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
      return null; // 실패 시 null 반환
    }
  };

  const fetchBestData = async param => {
    const data = await getList(param); // 비동기 호출 후 대기

    if (data && Array.isArray(data.list)) {
      // null, array체크후 setstate
      // console.log(data.list);
      setBestList(data.list);
    } else {
      setBestList([]);
    }
    // console.log(data);
  };

  const fetchEntireData = async param => {
    const data = await getList(param); // 비동기 호출 후 대기
    if (data && Array.isArray(data.list)) {
      setEntireList(data.list);
    } else {
      setEntireList([]);
    }
  };

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

  // 모바일용 버튼
  // const handleClickSearch = () => {
  //   fetchBestData({ keyword: { keyword } });
  // };

  useEffect(() => {
    fetchBestData({ pageSize: 3 }); // 베스트 호출
    fetchEntireData({ orderBy: 'recent' }); // 일반 조회
  }, []);

  return (
    <div className={styles.boardsPage}>
      <div className={styles.bestBoardContainer}>
        <div className={styles.bestBoardTitle}>베스트 게시글</div>
        <div className={styles.bestBoardCard}>
          {bestList.map(data => {
            return (
              <Fragment key={data.id}>
                <BestBoard data={data} />
              </Fragment>
            );
          })}
        </div>
      </div>
      <div className={styles.entireBoardContainer}>
        <div className={styles.entireBoardHeader}>
          <div className={styles.entireBoardTitle}>게시글</div>
          <button type="button" className={styles.smallButton}>
            글쓰기
          </button>
        </div>
        <div className={styles.entireBoardBody}>
          <div className={styles.userSelectSection}>
            <div className={styles.searchBar}>
              <Image width={'15'} height={'15'} src={search} alt="검색" />
              <input value={searchKeyword} onChange={handleInputChange} placeholder="검색할 상품을 입력해주세요" className={styles.searchBarInput} />
            </div>
            <select value={orderBy} onChange={handleChange}>
              <option value="recent">최신순</option>
              <option value="like">좋아요순</option>
            </select>
          </div>
          <div className={styles.entireBoardList}>
            {/* <button onClick={handleClickSearch}>검색하기</button> */}
            {entireList?.length > 0 ? (
              entireList.map(data => (
                <Fragment key={data.id}>
                  <EntireBoard data={data} />
                </Fragment>
              ))
            ) : (
              <div> 아직 리스트가 없습니다.</div> // 전체 리스트가 없을 때 출력될 메시지
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
