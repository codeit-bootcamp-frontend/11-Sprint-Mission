import { configureStore } from '@reduxjs/toolkit'
import reducerSlice from '@/service/reducerSlice'

const store = configureStore({
  reducer: { data: reducerSlice },
})

export type InitialStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
