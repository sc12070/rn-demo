import { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { selectStockSymbolList, selectStockList } from 'store/reducer/home/homeSelector'
import { useAppSelector, useAppDispatch } from 'store/hooks'
import { fetchStockList, getStoredStockSymbolList } from 'store/reducer/home/homeActions'

export default () => {
    const [refreshing, setRefreshing] = useState(false)

    const stockSymbolList = useAppSelector(selectStockSymbolList)
    const stockList = useAppSelector(selectStockList)

    const dispatch = useAppDispatch()

    let timerId: number

    useEffect(() => {
        dispatch(getStoredStockSymbolList())
    }, [])

    useEffect(() => {
        dispatch(fetchStockList(stockSymbolList))
        timerId = setInterval(() => {
            dispatch(fetchStockList(stockSymbolList))
        }, 6000)

        return () => {
            clearInterval(timerId)
        }
    }, [stockSymbolList])

    const refreshHandler = useCallback(async () => {
        setRefreshing(true)
        await dispatch(getStoredStockSymbolList())
        setRefreshing(false)
    }, [])

    return {
        refreshing,
        stockList,
        refreshHandler
    }
}

//https://query1.finance.yahoo.com/v11/finance/quoteSummary/aapl?modules=financialData
