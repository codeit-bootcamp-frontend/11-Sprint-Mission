import axios from "axios";

const instance = axios.create({
  baseURL: "https://panda-market-api.vercel.app",
});

export async function getArticles() {
  const res = await axios.get(baseURL);
  return res.data;
}

export async function getArticle() {}

export async function createArticle() {}

export async function patchArticle() {}

export async function deleteArticle() {}

// export async function postArticleLike() {}

export async function deleteArticleLike() {}

export default instance;
