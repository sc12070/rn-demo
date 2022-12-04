import { useEffect, useState } from 'react'
import { selectStockSymbolList, selectStockList } from 'store/reducer/home/homeSelector'
import { useAppSelector, useAppDispatch } from 'store/hooks'
import {
    appendStockSymbolList,
    fetchStockList,
    getStoredStockSymbolList
} from 'store/reducer/home/homeActions'

export default () => {
    const [symbolInput, setSymbolInput] = useState('')
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
        }, 10000)

        return () => {
            clearInterval(timerId)
        }
    }, [stockSymbolList])

    const addStockSymbol = () => {
        if (symbolInput === '') {
            return
        }
        dispatch(appendStockSymbolList(symbolInput.toUpperCase()))
        setSymbolInput('')
    }

    return {
        symbolInput,
        stockList,
        setSymbolInput,
        addStockSymbol
    }
}

//https://query1.finance.yahoo.com/v11/finance/quoteSummary/aapl?modules=financialData
