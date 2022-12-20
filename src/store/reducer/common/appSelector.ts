import { RootState } from 'store/store'
import { createSelector } from '@reduxjs/toolkit'

export const selectApp = (state: RootState) => state.app

export const selectIsLoading = createSelector(selectApp, home => home.isLoading)
