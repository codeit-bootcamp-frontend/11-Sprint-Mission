import axios from "axios";
const totalCount = 1000; // 전체에서의 Best상품을 뽑기 위해 첫 렌더링 시 모든 데이터를 요청.

async function getAllProducts() {
  try {
    const response = await axios.get(
      `https://panda-market-api.vercel.app/products?page=1&pageSize=${totalCount}&orderBy=recent`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}

async function getProductsByPage(pageNum, pageLimit) {
  try {
    const response = await axios.get(
      `https://panda-market-api.vercel.app/products?page=${pageNum}&pageSize=${pageLimit}&orderBy=recent`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
    return response.data.list;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}

export { getAllProducts, getProductsByPage };
