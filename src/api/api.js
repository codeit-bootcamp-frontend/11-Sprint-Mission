export async function getProducts(order = 'createdAt') {
    const query = 'order=${order}';
    const response = await fetch(
      `https://panda-market-api.vercel.app/products?${query}`
    );
    const body = await response.json();
    return body;
}