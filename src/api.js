export async function getItem() {
  const response = await fetch(
    "https://panda-market-api.vercel.app/products?page=20&pageSize=4&orderBy=favorite"
  ); // https://panda-market-api.vercel.app/docs/users/me/products
  const body = await response.json();
  return body;
}
