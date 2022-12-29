import { PayloadAction } from '@reduxjs/toolkit'

import { AppThunk } from 'store/store'
import { IAppState, setLoading } from './appSlice'

export const startLoading = (): AppThunk => dispatch => dispatch(setLoading(true))

export const stopLoading = (): AppThunk => dispatch => dispatch(setLoading(false))

export default {
    setLoading: (state: IAppState, action: PayloadAction<boolean>) => {
        state.isLoading = action.payload
    }
}
