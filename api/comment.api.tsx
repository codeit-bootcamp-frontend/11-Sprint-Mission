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

interface PostCommentByArticleId {
  articleId: number;
  content: string;
}

async function postCommentByArticleId({
  articleId,
  content,
}: PostCommentByArticleId) {
  const response = await axios({
    method: "post",
    url: `/articles/${articleId}/comments`,
    data: {
      content,
    },
  });
  return response.data;
}

export { getCommentListByArticleId, postCommentByArticleId };
export type { GetCommentListByArticleId, PostCommentByArticleId };
