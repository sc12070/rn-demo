import { createSlice } from '@reduxjs/toolkit'
import { IStockInfo } from 'store/apiDataModel/home'
import homeActions, { fetchStockList, getStoredStockSymbolList } from './homeActions'

export interface IHomeState {
    stockSymbolList: Array<string>
    stockList: Array<IStockInfo>
}

const initialState: IHomeState = {
    stockSymbolList: [],
    stockList: []
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: homeActions,
    extraReducers: builder => {
        builder
            .addCase(getStoredStockSymbolList.fulfilled, (state, action) => {
                if (action.payload) {
                    state.stockSymbolList = action.payload as Array<string>
                }
            })
            .addCase(getStoredStockSymbolList.rejected, (state, action) => {
                console.warn(action.payload)
                // TODO: pop up error msg
            })

            .addCase(fetchStockList.fulfilled, (state, action) => {
                state.stockList = action.payload?.quoteResponse?.result
            })
            .addCase(fetchStockList.rejected, (state, action) => {
                console.warn(action.payload)
                // TODO: pop up error msg
            })
    }
})

export const { setStockSymbolList } = homeSlice.actions

export default homeSlice.reducer
