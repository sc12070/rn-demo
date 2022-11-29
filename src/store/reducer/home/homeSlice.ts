import { createSlice } from '@reduxjs/toolkit'
import homeActions from './homeActions'

export interface HomeState {
  firstInput: number
  secondInput: number
  sum: number
}

const initialState: HomeState = {
  firstInput: 0,
  secondInput: 0,
  sum: 0
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: homeActions
})

export const { setFirstInput, setSecondInput } = homeSlice.actions

export default homeSlice.reducer
