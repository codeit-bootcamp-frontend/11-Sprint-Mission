import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { getComments } from '../api/api';
import useAsync from '../hooks/useAsync';
//
import Loading from './Loading';
import Dropdown from './Dropdown';
//
import emptyImage from '../assets/empty-placehoder.png';
import baseAvatar from '../assets/base-avatar.svg';
import styles from './Comments.module.css';

/**
 * 코멘트(문의) 목록 컴포넌트
 * @param {number} productId : 상품 아이디
 * @return {JSX}
 */
function Comments({ productId }) {
  const [comments, setComments] = useState(null);
  const [isLoading, loadingError, getCommentsAsync] = useAsync(getComments);

  useEffect(() => {
    if (!productId) return;

    const handleLoad = async () => {
      const result = await getCommentsAsync(productId);
      if (!result) return;

      setComments(result.list);
    };

    handleLoad();
  }, []);

  return (
    <>
      <Loading visible={isLoading} />
      {loadingError && <p className="error-message">{loadingError.message}</p>}

      {comments?.length > 0 ? (
        <ul className="my-6 flex flex-col gap-3">
          {comments.map(({ writer: { nickname }, id, content, updatedAt }) => (
            <li className={styles.comment} key={id}>
              <div className="flex gap-6 justify-between items-start">
                <p className={styles.content}>{content}</p>
                <Dropdown isRight>
                  <ul className={styles.menus}>
                    <li>
                      <button className={styles.btn} onClick={() => console.log('수정하기')}>
                        수정하기
                      </button>
                    </li>
                    <li>
                      <button className={styles.btn} onClick={() => console.log('삭제하기')}>
                        삭제하기
                      </button>
                    </li>
                  </ul>
                </Dropdown>
              </div>

              <div className="flex gap-2 items-center">
                <img src={baseAvatar} alt="" width="32" height="32" />
                <div>
                  <div className={styles.user}>{nickname}</div>
                  <div className={styles.date}>{dayjs(updatedAt).fromNow()}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.empty}>
          <figure>
            <img src={emptyImage} alt="어리둥절" />
            <figcaption className="mt-2">아직 문의가 없어요</figcaption>
          </figure>
        </div>
      )}
      <div className="flex justify-center">
        <Link to="/items" className="btn btn-lg btn-rounded my-12">
          목록으로 돌아가기
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.53333 3.60012C6.03627 3.60012 5.63333 4.00307 5.63333 4.50012C5.63333 4.99718 6.03627 5.40012 6.53333 5.40012V3.60012ZM6.53333 5.40012H16.6667V3.60012H6.53333V5.40012ZM21.1 9.83345V10.9001H22.9V9.83345H21.1ZM16.6667 15.3335H6.53333V17.1335H16.6667V15.3335ZM21.1 10.9001C21.1 13.3486 19.1151 15.3335 16.6667 15.3335V17.1335C20.1092 17.1335 22.9 14.3427 22.9 10.9001H21.1ZM16.6667 5.40012C19.1151 5.40012 21.1 7.38499 21.1 9.83345H22.9C22.9 6.39088 20.1092 3.60012 16.6667 3.60012V5.40012Z"
              fill="white"
            />
            <path d="M3 16.2335L10.2 12.5384L10.2 19.9285L3 16.2335Z" fill="white" />
          </svg>
        </Link>
      </div>
    </>
  );
}

export default Comments;
