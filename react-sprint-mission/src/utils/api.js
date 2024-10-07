import axios from "axios";

const getAxios = async (params) => {
  const queryParams = new URLSearchParams(params);

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}?${queryParams}`
    );
    if (res.status === 200) {
      return res;
    }
  } catch (e) {
    return e;
  }
};

const postAxios = async (params) => {
  const queryParams = new URLSearchParams(params);

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}?${queryParams}`
    );
    if (res.status === 200) {
      return res;
    }
  } catch (e) {
    return e;
  }
};

const deleteAxios = async (params) => {
  const queryParams = new URLSearchParams(params);

  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}?${queryParams}`
    );
    if (res.status === 200) {
      return res;
    }
  } catch (e) {
    return e;
  }
};

export { getAxios, postAxios, deleteAxios };
