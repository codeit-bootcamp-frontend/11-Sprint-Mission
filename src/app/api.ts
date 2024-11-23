import axios from 'axios';

const PATH = {
  ARTICLES: '/articles',
};

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 전체 게시글 리스트를 가져옵니다.
 * @returns {Promise<Object>} - 게시글 리스트
 */
async function getArticles() {
  const response = await api.get(PATH.ARTICLES);
  return response.data;
}

export { getArticles };
