import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IStockInfo } from 'store/apiDataModel/home'
import { AppThunk } from 'store/store'
import { fetchRequest } from 'utils/fetchHelper'
import SecureStoreHelper from 'utils/secureStoreHelper'
import { selectStockSymbolList } from './homeSelector'

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
    reducers: {
        setStockSymbolList: (state: IHomeState, action: PayloadAction<Array<string>>) => {
            state.stockSymbolList = action.payload
        }
    },
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

export const getStoredStockSymbolList = createAsyncThunk('getStoredStockSymbolList', async () => {
    try {
        const session = await SecureStoreHelper.get('stockSymbolList')
        if (typeof session === 'string') {
            return JSON.parse(session)
        } else {
            console.info('homeSlice.getStoredStockSymbolList: no session found')
            return []
        }
    } catch (error) {
        console.info('homeSlice.getStoredStockSymbolList: error', error)
    }
})

export const fetchStockList = createAsyncThunk(
    'fetchStockList',
    async (stockSymbolList: Array<string>) => {
        if (stockSymbolList.length < 1) {
            return {}
        }
        return await fetchRequest({
            api: `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${stockSymbolList.join(
                ','
            )}`,
            method: 'GET'
        })
    }
)

export const fetchChart = createAsyncThunk('fetchChart', async (symbol: string) => {
    return await fetchRequest({
        api: `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?metrics=high?&interval=1m&range=1d`,
        method: 'GET'
    })
})

export const appendStockSymbolList =
    (symbol: string): AppThunk =>
    (dispatch, getState) => {
        const stockSymbolList = selectStockSymbolList(getState())
        if (stockSymbolList.includes(symbol)) {
            return
        }
        const newStockSymbolList = [...stockSymbolList, symbol]
        SecureStoreHelper.save('stockSymbolList', JSON.stringify(newStockSymbolList))
        dispatch(setStockSymbolList(newStockSymbolList))
    }

export const removeStockSymbolList =
    (symbol: string): AppThunk =>
    (dispatch, getState) => {
        const stockSymbolList = selectStockSymbolList(getState())
        const newStockSymbolList = stockSymbolList.filter((s: string) => symbol !== s)
        SecureStoreHelper.save('stockSymbolList', JSON.stringify(newStockSymbolList))
        dispatch(setStockSymbolList(newStockSymbolList))
    }

export default homeSlice.reducer
