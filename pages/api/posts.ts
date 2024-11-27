const ACCESS_TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface CreatePostData {
  title: string;
  content: string;
  image: string | null;
}

export interface CreateCommentData {
  content: string | null;
}

export interface CreatePostResponse {
  id: number;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  writer: {
    nickname: string;
    id: number;
  };
}

export interface CreateCommentResponse {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
    image: null;
  };
}

export const createPost = async (
  data: CreatePostData
): Promise<CreatePostResponse> => {
  const res = await fetch(`${API_BASE_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("게시글 작성에 실패했어요");
  }
  return res.json();
};

export const createComment = async (
  articleId: number,
  data: CreateCommentData
): Promise<CreateCommentResponse> => {
  const res = await fetch(`${API_BASE_URL}/articles/${articleId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("댓글 작성에 실패했어요");
  }
  return res.json();
};
