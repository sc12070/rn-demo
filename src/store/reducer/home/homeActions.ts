import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import SecureStoreHelper from 'utils/secureStoreHelper'
import { fetchRequest } from 'utils/fetchHelper'
import { AppThunk } from 'store/store'
import { HomeState, setStockSymbolList } from './homeSlice'
import { selectStockSymbolList } from './homeSelector'

export const getStoredStockSymbolList = createAsyncThunk('getStoredStockSymbolList', async () => {
    try {
        const session = await SecureStoreHelper.get('stockSymbolList')
        if (typeof session === 'string') {
            return JSON.parse(session)
        } else {
            console.info('homeActions.getStoredStockSymbolList: no session found')
            return []
        }
    } catch (error) {
        console.info('homeActions.getStoredStockSymbolList: error', error)
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
        api: `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?metrics=high?&interval=5m&range=1d`,
        method: 'GET'
    })
})

export const appendStockSymbolList =
    (symbol: string): AppThunk =>
    (dispatch, getState) => {
        if (symbol === 'DELETE_ALL') {
            SecureStoreHelper.remove('stockSymbolList')
            dispatch(setStockSymbolList([]))
            return
        }
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

export default {
    setStockSymbolList: (state: HomeState, action: PayloadAction<Array<string>>) => {
        state.stockSymbolList = action.payload
    }
}
