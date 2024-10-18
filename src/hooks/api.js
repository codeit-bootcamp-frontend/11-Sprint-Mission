const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function getProducts(page = 1, pageSize = 6, orderBy = 'recent') {
  const query = `products?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`;
  const apiUrl = `${baseUrl}/${query}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('데이터 로드에 실패했습니다.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    throw error;
  }
}

//상품상세정보api
export async function getProductDetail(productId) {
  const apiUrl = `${baseUrl}/products/${productId}`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    console.error(`Error: ${response.statusText}`);
    throw new Error('상세 정보를 불러오는 데 실패했스빈다.');
  }

  const data = await response.json();
  return data;
}

//상품댓글api
export async function getProductDetailComment(
  productId,
  limit = null,
  cursor = null
) {
  let commentApiUrl = `${baseUrl}/products/${productId}/comments`;

  if (limit !== null && cursor !== null) {
    commentApiUrl += `?limit=${limit}&cursor=${cursor}`;
  }

  const response = await fetch(commentApiUrl);
  if (!response.ok) {
    console.error(`Error: ${response.statusText}`);
    throw new Error('댓글 정보를 불러오는 데 실패했습니다.');
  }

  const data = await response.json();
  return data;
}
