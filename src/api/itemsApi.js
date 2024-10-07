const ItemAPI_URL = "https://panda-market-api.vercel.app/products";

export const fetchProducts = async () => {
  try {
    const response = await fetch(ItemAPI_URL);
    if (!response.ok) {
      throw new Error("Network response Error");
    }

    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw error;
  }
};
