import { FormInputInterface } from "@/types/addBoard";
import { ArticleInquiryInterface, PostCommentInterface } from "@/types/article";

const fetchArticles = async ({
  page = "1",
  pageSize = "10",
  orderBy = "like",
  keyword = "",
}) => {
  try {
    const queryParams = new URLSearchParams({ page, pageSize, orderBy });
    if (keyword) queryParams.set("keyword", keyword);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/articles?${queryParams}`
    );
    if (!response.ok) {
      throw new Error("데이터 불러오기 실패");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const fetchArticleById = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/articles/${id}`
    );
    if (!response.ok) {
      throw new Error("데이터 불러오기 실패");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const fetchInquiryById = async (id: string, cursor: string | null = null) => {
  try {
    const queryParams = new URLSearchParams({ limit: "5" });
    if (cursor) queryParams.set("cursor", cursor);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/articles/${id}/comments?${queryParams}`
    );
    if (!response.ok) {
      throw new Error("데이터 불러오기 실패");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const retryFetch = async (
  url: string,
  options: RequestInit
): Promise<Response> => {
  const response = await fetch(url, options);

  if (response.status === 401) {
    // status === 401 : Unauthorized 토큰 갱신
    const refreshResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: localStorage.getItem("refreshToken"),
        }),
      }
    );

    if (refreshResponse.ok) {
      const { accessToken, refreshToken } = await refreshResponse.json();
      // localStorage에 갱신된 토큰 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // requset 재요청
      const newOptions = {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      };
      return await fetch(url, newOptions);
    } else {
      throw new Error("토큰 갱신 실패. 다시 로그인하세요.");
    }
  }

  return response;
};

const uploadImage = async (file: string) => {
  if (!file) {
    return null; // 이미지가 없으면 null 반환
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await retryFetch(
      `${process.env.NEXT_PUBLIC_UPLOAD_IMAGE_URL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("업로드 실패");
    }

    const data = await response.json(); // 서버의 JSON 응답
    return data.url; // 서버 URL 리턴해서 postArticle API에서 사용
  } catch (error) {
    console.error("이미지 업로드 중 오류 발생:", error);
    return null;
  }
};

const postArticle = async ({ title, content, image }: FormInputInterface) => {
  let imageUrl = null;

  if (image) {
    // 이미지 업로드 후 URL 받기
    imageUrl = await uploadImage(image[0]);
  }

  const data = {
    image: imageUrl || undefined,
    content,
    title,
  };

  try {
    const response = await retryFetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/articles`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (response.ok) {
      return result.id;
    } else {
      throw new Error("게시글 추가 실패");
    }
  } catch (error) {
    throw error;
  }
};

const postArticleComment = async ({
  id,
  content,
}: PostCommentInterface): Promise<ArticleInquiryInterface> => {
  try {
    const response = await retryFetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/articles/${id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ content }),
      }
    );

    const result = await response.json();
    if (response.ok) {
      return result;
    } else {
      throw new Error("댓글 추가 실패");
    }
  } catch (error) {
    throw error;
  }
};

export {
  fetchArticles,
  fetchArticleById,
  fetchInquiryById,
  postArticle,
  postArticleComment,
};
