import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Article {
  id: number;
  title: string;
  content: string;
  writer: {
    id: number;
    nickname: string;
  };
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  isLiked: boolean;
}

export interface ArticleState {
  article: Article | null;
}

const initialState: ArticleState = {
  article: null,
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setArticleDetail: (state, action: PayloadAction<Article>) => {
      state.article = action.payload;
    },
    // toggleLike: (state) => {
    //   if (state.article) {
    //     state.article.isLiked = !state.article.isLiked;
    //     state.article.likeCount += state.article.isLiked ? 1 : -1;
    //   }
    // },
    // updateArticle: (state, action: PayloadAction<Partial<Article>>) => {
    //   if (state.article) {
    //     state.article = { ...state.article, ...action.payload };
    //   }
    // },
  },
});
const articleReducer = articleSlice.reducer;
export const { setArticleDetail } = articleSlice.actions;

export default articleReducer;
