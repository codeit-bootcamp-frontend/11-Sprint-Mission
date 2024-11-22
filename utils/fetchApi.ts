const API_URL = 'https://panda-market-api.vercel.app';

export async function fetchApi(endpoint: string, options = {}) {
  const url = `${API_URL}${endpoint}`;
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('서버에서 오류 응답을 받았습니다.');
    }
    return await response.json();
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : '데이터를 불러오는데 실패했습니다.';
    throw new Error(errorMessage);
  }
}
