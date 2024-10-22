export async function getItems({
  orderBy = "recent",
  keyword = "",
  page = 1,
  pageSize = 10,
}) {
  const query = `orderBy=${orderBy}&keyword=${keyword}&page=${page}&pageSize=${pageSize}`;
  const response = await fetch(
    `https://panda-market-api.vercel.app/products?${query}`
  );

  if (!response.ok) {
    throw new Error("잘못된 정보입니다.");
  }

  const body = await response.json();
  return body;
}

export async function getItemById({ id }) {
  const query = `${id}`;
  const response = await fetch(
    `https://panda-market-api.vercel.app/products/${query}`
  );

  if (!response.ok) {
    throw new Error("잘못된 정보입니다.");
  }

  const body = await response.json();
  return body;
}

export async function getComments({ id, limit = 10 }) {
  const query = `limit=${limit}`;
  const response = await fetch(
    `https://panda-market-api.vercel.app/products/${id}/comments?${query}`
  );

  if (!response.ok) {
    throw new Error("잘못된 정보입니다");
  }

  const body = await response.json();
  return body;
}
