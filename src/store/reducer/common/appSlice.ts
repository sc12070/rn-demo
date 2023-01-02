import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'store/store'

export interface IAppState {
    isLoading: boolean
}

const initialState: IAppState = {
    isLoading: false
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLoading: (state: IAppState, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        }
    }
})

export const { setLoading } = appSlice.actions

export const startLoading = (): AppThunk => dispatch => dispatch(setLoading(true))

export const stopLoading = (): AppThunk => dispatch => dispatch(setLoading(false))

export default appSlice.reducer
