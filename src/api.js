import axios from "axios";

const BASE_URL = "https://panda-market-api.vercel.app";

export const fetchItems = async () => {
  return axios.get(`${BASE_URL}/products`, {
    // params: {
    //   page,
    //   pageSize,
    //   orderBy,
    //   keyword,
    // },
  });
};
