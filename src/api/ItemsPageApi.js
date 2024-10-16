export async function getList({ page = 1, pageSize = 10, orderBy = "recent" }) {
  const query = `page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`;
  const response = await fetch(
    `https://panda-market-api.vercel.app/products?${query}`
  );
  if (!response.ok) {
    throw new Error("페이지를 불러오는 데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}
