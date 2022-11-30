import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import homeReducer from './reducer/home/homeSlice'

export const store = configureStore({
  reducer: {
    home: homeReducer
  },
  devTools: true
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
