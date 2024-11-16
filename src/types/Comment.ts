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

interface CommentList {
  nextCursor: number;
  list: Comment[];
}

export type { Comment, CommentList };
