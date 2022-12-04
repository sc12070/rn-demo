import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import EncryptedStorage from 'react-native-encrypted-storage'

import { fetchRequest } from 'utils/fetchHelper'
import { AppThunk } from 'store/store'
import { HomeState, setStockSymbolList } from './homeSlice'
import { selectStockSymbolList } from './homeSelector'

export const getStoredStockSymbolList = createAsyncThunk('getStoredStockSymbolList', async () => {
    try {
        const session = await EncryptedStorage.getItem('stockSymbolList')
        if (typeof session == 'string') {
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
    'fetchRequest',
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

export const appendStockSymbolList =
    (symbol: string): AppThunk =>
    (dispatch, getState) => {
        if (symbol === 'DELETE_ALL') {
            EncryptedStorage.removeItem('stockSymbolList')
            dispatch(setStockSymbolList([]))
            return
        }
        const stockSymbolList = selectStockSymbolList(getState())
        if (stockSymbolList.includes(symbol)) {
            return
        }
        const newStockSymbolList = [...stockSymbolList, symbol]
        EncryptedStorage.setItem('stockSymbolList', JSON.stringify(newStockSymbolList))
        dispatch(setStockSymbolList(newStockSymbolList))
    }

export const removeStockSymbolList =
    (symbol: string): AppThunk =>
    (dispatch, getState) => {
        const stockSymbolList = selectStockSymbolList(getState())
        const newStockSymbolList = stockSymbolList.filter((s: string) => symbol !== s)
        EncryptedStorage.setItem('stockSymbolList', JSON.stringify(newStockSymbolList))
        dispatch(setStockSymbolList(newStockSymbolList))
    }

export default {
    setStockSymbolList: (state: HomeState, action: PayloadAction<Array<string>>) => {
        state.stockSymbolList = action.payload
    }
}
