export interface Comments {
  nextCursor: number;
  list: Comment[] | [];
}

export interface Comment {
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
