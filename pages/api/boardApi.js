import axiosInstance from '@lib/axiosInstance';

async function apiRequest({
  method = 'GET',
  endpoint,
  data = null,
  errorMessage,
}) {
  try {
    const response = await axiosInstance({
      method,
      url: endpoint,
      data,
    });
    return response.data;
  } catch (error) {
    throw new Error(errorMessage);
  }
}

export async function getBestArticles(size) {
  return apiRequest({
    method: 'GET',
    endpoint: `/articles?pageSize=${size}&orderBy=like`,
    errorMessage: '게시글을 불러오는데 실패했습니다.',
  });
}

export async function getAllArticles(page, orderBy, keyword) {
  return apiRequest({
    method: 'GET',
    endpoint: `/articles?page=${page}&pageSize=10&orderBy=${orderBy}&keyword=${keyword}`,
    errorMessage: '게시글을 불러오는데 실패했습니다.',
  });
}

export async function getArticles(id) {
  return apiRequest({
    method: 'GET',
    endpoint: `/articles/${id}`,
    errorMessage: '게시글을 불러오는데 실패했습니다.',
  });
}
