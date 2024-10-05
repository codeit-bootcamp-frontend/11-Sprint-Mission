async function getItems(orderBy = 'recent', keyword = '', page = 1) {
  const query = `orderBy=${orderBy}&keyword=${keyword}&page=${page}`;
  const response = await fetch(
    `https://panda-market-api.vercel.app/products?${query}`
  );
  const body = await response.json();
  return body;
}

export default getItems;
