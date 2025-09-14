import { configureStore } from '@reduxjs/toolkit'
import contentsReducer from '../features/contents/contentsSlice'

export const store = configureStore({
  reducer: {
    contents: contentsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
