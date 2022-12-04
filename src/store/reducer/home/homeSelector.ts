import { RootState } from 'store/store'
import { createSelector } from '@reduxjs/toolkit'

export const selectHome = (state: RootState) => state.home

export const selectStockSymbolList = createSelector(selectHome, home => home.stockSymbolList)

export const selectStockList = createSelector(selectHome, home => home.stockList)
