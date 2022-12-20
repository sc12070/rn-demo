import { createSlice } from '@reduxjs/toolkit'
import appActions from './appActions'

export interface AppState {
    isLoading: boolean
}

const initialState: AppState = {
    isLoading: false
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: appActions
})

export const { setLoading } = appSlice.actions

export default appSlice.reducer
