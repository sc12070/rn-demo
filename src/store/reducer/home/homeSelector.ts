import { RootState } from 'store/store'
import { createSelector } from '@reduxjs/toolkit'

export const selectHome = (state: RootState) => state.home

export const selectSum = createSelector(selectHome, home => home.sum)
