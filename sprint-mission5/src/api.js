export async function getBestProducts({ pageSize = 4 }) {
  const response = await fetch(
    `https://panda-market-api.vercel.app/products?page=1&pageSize=${pageSize}&orderBy=favorite`
  );
  const data = await response.json();
  return data;
}

export async function getAllProducts({
  page = "1",
  pageSize = "10",
  orderBy = "recent",
}) {
  const query = `page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`;
  const response = await fetch(`https://learn.codeit.kr/api/foods?${query}`);
  if (!response.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다");
  }
  const data = await response.json();
  return data;
}