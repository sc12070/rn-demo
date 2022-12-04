import { createSlice } from '@reduxjs/toolkit'
import homeActions, { fetchStockList, getStoredStockSymbolList } from './homeActions'

export interface HomeState {
    isLoading: boolean
    stockSymbolList: Array<string>
    stockList: Array<StockInfo>
}

export interface StockInfo {
    longName: string
    symbol: string
    preMarketPrice: number
    preMarketChange: number
    preMarketChangePercent: number
    regularMarketOpen: number
    regularMarketPrice: number
    regularMarketChange: number
    regularMarketChangePercent: number
    regularMarketVolume: number
    postMarketPrice: number
    postMarketChange: number
    postMarketChangePercent: number
    marketState: string
}

const initialState: HomeState = {
    isLoading: false,
    stockSymbolList: [],
    stockList: []
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: homeActions,
    extraReducers: builder => {
        builder
            .addCase(getStoredStockSymbolList.pending, state => {
                state.isLoading = true
            })
            .addCase(getStoredStockSymbolList.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload) {
                    state.stockSymbolList = action.payload as Array<string>
                }
            })
            .addCase(getStoredStockSymbolList.rejected, (state, action) => {
                state.isLoading = false
                console.warn(action.payload)
                // TODO: pop up error msg
            })
            .addCase(fetchStockList.pending, state => {
                state.isLoading = true
            })
            .addCase(fetchStockList.fulfilled, (state, action) => {
                state.isLoading = false
                state.stockList = action.payload?.quoteResponse?.result
            })
            .addCase(fetchStockList.rejected, (state, action) => {
                state.isLoading = false
                console.warn(action.payload)
                // TODO: pop up error msg
            })
    }
})

export const { setStockSymbolList } = homeSlice.actions

export default homeSlice.reducer
