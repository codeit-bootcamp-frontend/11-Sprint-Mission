async function getItems(
  orderBy = 'recent',
  keyword = '',
  page = 1,
  pageSize = 10
) {
  const query = `orderBy=${orderBy}&keyword=${keyword}&page=${page}&pageSize=${pageSize}`;
  const response = await fetch(
    `https://panda-market-api.vercel.app/products?${query}`
  );
  const body = await response.json();
  return body;
}

export default getItems;
