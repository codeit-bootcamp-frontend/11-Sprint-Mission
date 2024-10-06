export async function getProductsList() {
  const reponse = await fetch("https://panda-market-api.vercel.app/products");
  const body = await reponse.json();

  return body;
}
