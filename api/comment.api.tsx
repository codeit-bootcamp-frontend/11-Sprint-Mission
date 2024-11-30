import axios from "./axios";

interface GetCommentListByArticleId {
  articleId: number;
  limit: number;
  cursor?: number;
}

async function getCommentListByArticleId({
  articleId,
  limit,
  cursor,
}: GetCommentListByArticleId) {
  const response = await axios.get(`/articles/${articleId}/comments`, {
    params: {
      limit,
      cursor,
    },
  });
  return response.data;
}

export { getCommentListByArticleId };
export type { GetCommentListByArticleId };
