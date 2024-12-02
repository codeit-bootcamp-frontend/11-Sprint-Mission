/**
 * 댓글 타입
 * @interface Comment
 * @property {object} writer - 댓글 작성자
 * @property {string} updatedAt - 댓글 수정일
 * @property {string} createdAt - 댓글 생성일
 * @property {string} content - 댓글 내용
 * @property {number} id - 댓글 번호
 */
interface Comment {
  writer: {
    image: string;
    nickname: string;
    id: number;
  };
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
}

/**
 * 댓글 리스트 타입
 * @interface Comments
 * @property {number | null} nextCursor - 다음 댓글 커서
 * @property {Comment[]} list - 댓글 목록
 */
interface Comments {
  nextCursor: number | null;
  list: Comment[];
}

export type { Comment, Comments };
