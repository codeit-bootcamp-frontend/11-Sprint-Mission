import axios from 'axios';

const apiUrl = 'https://panda-market-api.vercel.app/products';

// 로그인 기능 구현 후 작업됩니다.
/* let accessToken;
if (typeof window !== 'undefined') {
  accessToken = localStorage.getItem('accessToken') ?? '';

  // 테스트용
  if (accessToken) {
    console.log('Access Token 있음', accessToken);
  } else {
    console.log('Access Token 없음');
  }
} */

function getItems(orderBy = 'recent', keyword = '', page = 1, pageSize = 10) {
  const query = `?orderBy=${orderBy}&keyword=${keyword}&page=${page}&pageSize=${pageSize}`;

  return axios
    .get(`${apiUrl}${query}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('패칭 중 오류가 발생했습니다', error);
      throw new Error('상품을 불러오는데 실패했습니다.');
    });
}

function createItems(formData) {
  return axios
    .post(apiUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error('패칭 중 오류가 발생했습니다.', error);
      throw new Error('상품을 등록하는데 실패했습니다.');
    });
}

export { getItems, createItems };
