import { createSlice } from "@reduxjs/toolkit";

interface ProductInfoState {
  createdAt: string;
  favoriteCount: number;
  ownerNickname: string;
  ownerId: number;
  images: File[];
  tags: string[];
  price: number;
  description: string;
  name: string;
  id: number;
  isFavorite: boolean;
}

const initialState: ProductInfoState = {
  createdAt: "",
  favoriteCount: 0,
  ownerNickname: "",
  ownerId: 0,
  images: [],
  tags: [],
  price: 0,
  description: "",
  name: "",
  id: 0,
  isFavorite: true,
};

const productSlice = createSlice({
  name: "productInfo",
  initialState,
  reducers: {
    setProductInfo: (state, action) => {
      const {
        createdAt,
        favoriteCount,
        ownerNickname,
        ownerId,
        images,
        tags,
        price,
        description,
        name,
        id,
        isFavorite,
      } = action.payload;
      Object.assign(state, {
        createdAt,
        favoriteCount,
        ownerNickname,
        ownerId,
        images,
        tags,
        price,
        description,
        name,
        id,
        isFavorite,
      });
    },
  },
});

const productInfoReducer = productSlice.reducer;

export const { setProductInfo } = productSlice.actions;
export default productInfoReducer;
