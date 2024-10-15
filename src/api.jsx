export async function getBestItems({ pageSize = 4 }) {
  const response = await fetch(
    `https://panda-market-api.vercel.app/products?page=1&pageSize=${pageSize}&orderBy=favorite`
  );
  const data = await response.json();
  return data;
}

export async function getAllItems({
  page = 1,
  orderBy = "recent",
  pageSize = 10,
}) {
  const query = `page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`;
  const response = await fetch(
    `https://panda-market-api.vercel.app/products?${query}`
  );
  const data = await response.json();
  return data;
}

export async function getItem(id) {
  const response = await fetch(
    `https://panda-market-api.vercel.app/products/${id}`
  );
  const data = await response.json();
  return data;
}
