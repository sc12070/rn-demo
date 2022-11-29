import { PayloadAction } from '@reduxjs/toolkit'
import { HomeState } from './homeSlice'

export default {
  setFirstInput: (state: HomeState, action: PayloadAction<number>) => {
    state.firstInput = action.payload
    state.sum = state.firstInput + state.secondInput
  },
  setSecondInput: (state: HomeState, action: PayloadAction<number>) => {
    state.secondInput = action.payload
    state.sum = state.firstInput + state.secondInput
  }
}
