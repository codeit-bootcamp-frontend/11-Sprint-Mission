import axios from "axios";

export const fetchItems = async () => {
  return axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/products`, {
    // params: {
    //   page,
    //   pageSize,
    //   orderBy,
    //   keyword,
    // },
  });
};
