import axios from "axios";
const TOTAL_COUNT = 1000; // 전체에서의 Best상품을 뽑기 위해 첫 렌더링 시 모든 데이터를 요청.
const BASE_URL = 'https://panda-market-api.vercel.app/products';

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

export async function fetchProducts(params) {
  try {
    const response = await axios.get(BASE_URL, {
      headers: DEFAULT_HEADERS,
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

async function getAllProducts() {
  return fetchProducts({
    page: 1,
    pageSize: TOTAL_COUNT,
    orderBy: 'recent',
  });
}

async function getProductsByPage(pageNum, pageLimit) {
  const data = await fetchProducts({
    page: pageNum,
    pageSize: pageLimit,
    orderBy: 'recent',
  });
  return data.list;
}

export { getAllProducts, getProductsByPage };
