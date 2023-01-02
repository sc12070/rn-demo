import { useCallback, useEffect, useRef, useState } from 'react'
import { selectStockSymbolList, selectStockList } from 'store/reducer/home/homeSelector'
import { useAppSelector, useAppDispatch } from 'store/hooks'
import { fetchStockList, getStoredStockSymbolList } from 'store/reducer/home/homeSlice'

export default () => {
    const [refreshing, setRefreshing] = useState(false)

    const stockSymbolList = useAppSelector(selectStockSymbolList)
    const stockList = useAppSelector(selectStockList)

    const dispatch = useAppDispatch()

    let timerId = useRef<ReturnType<typeof setInterval> | null>(null)

    useEffect(() => {
        dispatch(getStoredStockSymbolList())
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchStockList(stockSymbolList))
        const id = setInterval(() => {
            dispatch(fetchStockList(stockSymbolList))
        }, 6000)
        timerId.current = id

        return () => {
            if (timerId.current !== null) {
                clearInterval(timerId.current)
            }
        }
    }, [dispatch, stockSymbolList])

    const refreshHandler = useCallback(async () => {
        setRefreshing(true)
        await dispatch(getStoredStockSymbolList())
        setRefreshing(false)
    }, [dispatch])

    return {
        refreshing,
        stockList,
        refreshHandler
    }
}
