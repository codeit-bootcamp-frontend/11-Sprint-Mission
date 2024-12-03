'use client'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { apiItem, getPreduct } from './api'
import { AppDispatch } from '@/store/store'
import { useDispatch } from 'react-redux'
import { deviceItemCount } from '@/utils/initialDevice'

export const getItem = createAsyncThunk('data/getItem', apiItem)
export const getBestItem = createAsyncThunk('data/getBestItem', apiItem)
export const getProduct = createAsyncThunk('data/getProduct', getPreduct)

interface ItemType {
  list: [{ id: number; images: string; name: string; price: number; favoriteCount: number }] | []
  totalCount: number
}

interface ProductsType {
  name: string
  price: string
  images: string
  description: string
  tags: []
  ownerNickname: string
  updatedAt: string
  favoriteCount: number
}

interface InitialStateType {
  status: string
  items: ItemType
  bestItems: ItemType
  product: ProductsType
  deviceItemCount: number
}

const initialState: InitialStateType = {
  status: '',
  items: { list: [], totalCount: 0 },
  bestItems: { list: [], totalCount: 0 },
  product: { name: '', price: '', images: '', description: '', tags: [], ownerNickname: '', updatedAt: '', favoriteCount: 0 },
  deviceItemCount: 0,
}
const apiSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setDeviceItemCount: (state, action) => {
      state.deviceItemCount = deviceItemCount({ contentType: action.payload })
    },
  },

  extraReducers: builder => {
    builder.addCase(getItem.pending, state => {
      state.status = 'pending'
    })
    builder.addCase(getItem.fulfilled, (state, action: PayloadAction<ItemType>) => {
      state.status = 'success'
      state.items = action.payload
    })
    builder.addCase(getItem.rejected, state => {
      state.status = 'failed'
    })
    builder.addCase(getBestItem.pending, state => {
      state.status = 'pending'
    })
    builder.addCase(getBestItem.fulfilled, (state, action: PayloadAction<ItemType>) => {
      state.bestItems = action.payload
    })
    builder.addCase(getBestItem.rejected, state => {
      state.status = 'failed'
    })
    builder.addCase(getProduct.pending, state => {
      state.status = 'pending'
    })
    builder.addCase(getProduct.fulfilled, (state, action: PayloadAction<ProductsType>) => {
      state.product = action.payload
    })
    builder.addCase(getProduct.rejected, state => {
      state.status = 'failed'
    })
  },
})

export const { setDeviceItemCount } = apiSlice.actions

export const useAppDispatch: () => AppDispatch = useDispatch
export default apiSlice.reducer
