import axios from "axios";

async function getProducts() {
  try {
    const response = await axios.get(
      "https://panda-market-api.vercel.app/products?page=1&pageSize=10&orderBy=recent",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
    return response.data.list;

  } catch (error) {

    console.error("Error fetching products:", error);
    return null;
  }
}

export default getProducts;
