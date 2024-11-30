"use client";

import { create } from "zustand";

export type OrderBy = "recent" | "like";

export interface ArticleStore {
  keyword: string;
  toggleState: OrderBy;
  setKeyword: (keyword: string) => void;
  setToggleState: (state: OrderBy) => void;
}

export const useArticleStore = create<ArticleStore>((set) => ({
  keyword: "",
  toggleState: "like",
  setKeyword: (keyword: string) => set({ keyword }),
  setToggleState: (toggleState: OrderBy) => set({ toggleState }),
}));
