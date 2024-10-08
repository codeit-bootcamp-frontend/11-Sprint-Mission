export async function getProducts(order = 'createdAt') {
  const query = `order=${order}`;
  const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/products?${query}`;

  console.log('API URL:', apiUrl);
  const response = await fetch(apiUrl);
  const body = await response.json();
  return body;
}
