import { getAccessToken } from "./api";
const API_BASE_URL = "https://panda-market-api.vercel.app";

export interface CreatePostData {
  title: string;
  content: string;
  image: string | null;
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
export interface CreateCommentData {
  content: string | null;
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

//게시글 이미지 url 생성
export const uploadImage = async (file: File): Promise<string> => {
  const accessToken = await getAccessToken();
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API_BASE_URL}/images/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`이미지 업로드에 실패했어요: ${errorText}`);
  }

  const data = await res.json();
  return data.url;
};

// 게시글 생성
export const createPost = async (
  data: CreatePostData
): Promise<CreatePostResponse> => {
  const accessToken = await getAccessToken();
  const res = await fetch(`${API_BASE_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("게시글 작성에 실패했어요");
  }
  return res.json();
};

// 게시글 댓글 생성
export const createComment = async (
  articleId: number,
  data: CreateCommentData
): Promise<CreateCommentResponse> => {
  const accessToken = await getAccessToken();
  const res = await fetch(`${API_BASE_URL}/articles/${articleId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("댓글 작성에 실패했어요");
  }
  return res.json();
};
