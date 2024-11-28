import Link from 'next/link';
import Image from 'next/image';
import axios from '@/pages/api/api';
import SelectBox from '@/components/SelectBox';
import CommentList from '@/components/CommentList';
import Profile from '@/public/ic_profile.svg';
import Heart from '@/public/ic_heart.svg';
import Back from '@/public/ic_back.svg';

function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

export async function getServerSideProps(context) {
  const articleId = context.params['articleId'];

  try {
    const response = await axios.get(`/articles/${articleId}`);
    console.log(response);
    return {
      props: {
        boardData: response.data,
      },
    };
  } catch (error) {
    console.error('Failed to fetch article data:', error);
    return {
      props: {
        boardData: null,
      },
    };
  }
}

export default function Board({ boardData }) {
  if (!boardData) {
    return <div>게시글을 불러올 수 없습니다.</div>;
  }
  return (
    <>
      <main className="item-detail-page">
        <div className="detail-conent">
          <section className="item-detail-container">
            <div className="DetailBoardCard">
              <div className="DetailedBoardContainer">
                <div className="BoardHeader">
                  <h3 className="BoardTitle">{boardData?.title || '제목 없음'}</h3>
                  <SelectBox />
                </div>
                {boardData?.image?.[0] && (
                  <Image
                    alt="상품사진"
                    src={boardData.image[0]}
                    className="item-Image"
                    width={400}
                    height={300} // 이미지 크기 조정
                  />
                )}
                <section className="seller-space">
                  <div className="seller">
                    <Image src={Profile} alt="캐릭터" />
                    <div className="seller-info">
                      <p className="seller-nickname">{boardData?.writer.nickname || '익명'}</p>
                      <p className="selling-updatedAt">{formatDate(boardData?.createdAt)}</p>
                    </div>
                  </div>
                  <div className="like-button">
                    <button className="button-content">
                      <Image src={Heart} alt="좋아요" />
                      <p>{boardData?.likeCount || 0}</p>
                    </button>
                  </div>
                </section>
              </div>
              <div className="BoardMainContent">{boardData?.content || '내용 없음'}</div>
            </div>
          </section>
          {/* <section className="item-comments-container">
            <CommentList commentList={data} />
          </section> */}
        </div>
        <Link href="/boards">
          <button className="return-list-btn">
            <div>목록으로 돌아가기</div>
            <Image width={24} height={24} src={Back} alt="목록으로 돌아가기" />
          </button>
        </Link>
      </main>
    </>
  );
}
