import { PayloadAction } from '@reduxjs/toolkit'

import { AppThunk } from 'store/store'
import { AppState, setLoading } from './appSlice'

export const startLoading = (): AppThunk => dispatch => dispatch(setLoading(true))

export const stopLoading = (): AppThunk => dispatch => dispatch(setLoading(false))

export default {
    setLoading: (state: AppState, action: PayloadAction<boolean>) => {
        state.isLoading = action.payload
    }
}
