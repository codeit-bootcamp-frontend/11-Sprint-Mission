export async function getBestProducts({ pageSize = 4 }) {
  const response = await fetch(
    `https://panda-market-api.vercel.app/products?page=1&pageSize=${pageSize}&orderBy=favorite`
  );
  if (!response.ok) {
    throw new Error("베스트 상품 데이터를 불러오는데 실패했습니다");
  }
  const data = await response.json();
  return data;
}

export async function getAllProducts({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
}) {
  const query = `page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`;
  const response = await fetch(
    `https://panda-market-api.vercel.app/products?${query}`
  );
  if (!response.ok) {
    throw new Error("전체 상품 데이터를 불러오는데 실패했습니다");
  }
  const data = await response.json();
  return data;
}
