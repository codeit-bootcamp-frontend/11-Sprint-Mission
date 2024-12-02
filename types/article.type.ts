/**
 * 게시글 데이터 타입
 * @interface Article
 * @property {string} updatedAt 게시글 수정일
 * @property {string} createdAt 게시글 생성일
 * @property {number} likeCount 게시글 좋아요 수
 * @property {object} writer 게시글 작성자
 * @property {string} image 게시글 이미지 주소
 * @property {string} content 게시글 내용
 * @property {string} title 게시글 제목
 * @property {number} id 게시글 번호
 */
interface Article {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: {
    nickname: string;
    id: number;
  };
  image: string;
  content: string;
  title: string;
  id: number;
}

/**
 * 게시글 리스트 타입
 * @interface Articles
 * @property {number} totalCount - 게시글 총 갯수
 * @property {Article[]} list - 게시글 목록
 */
interface Articles {
  totalCount: number;
  list: Article[];
}

export type { Article, Articles };
