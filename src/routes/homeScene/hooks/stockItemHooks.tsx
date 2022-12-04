import { useEffect, useState } from 'react'
import { useAppDispatch } from 'store/hooks'
import { removeStockSymbolList } from 'store/reducer/home/homeActions'
import { StockInfo } from 'store/reducer/home/homeSlice'
import { shortenNumber } from 'utils/numberHelper'

export interface StockItemPresent {
    longName: string
    symbol: string
    price: number
    priceChange: number
    priceChangePercent: number
    volume: string
}

export default (item: StockInfo) => {
    const {
        symbol,
        preMarketPrice,
        preMarketChange,
        preMarketChangePercent,
        regularMarketPrice,
        regularMarketChange,
        regularMarketChangePercent,
        regularMarketVolume,
        postMarketPrice,
        postMarketChange,
        postMarketChangePercent,
        marketState
    } = item

    const [price, setPrice] = useState(regularMarketPrice)
    const [priceChange, setPriceChange] = useState(0)
    const [priceChangePercent, setPriceChangePercent] = useState(0)
    const [volume, setVolume] = useState(shortenNumber(regularMarketVolume || 0))
    const dispatch = useAppDispatch()

    useEffect(() => {
        switch (marketState) {
            case 'PRE':
                setPrice(preMarketPrice)
                setPriceChange(preMarketChange)
                setPriceChangePercent(preMarketChangePercent)
                break
            case 'CLOSED':
                setPrice(postMarketPrice)
                setPriceChange(postMarketChange)
                setPriceChangePercent(postMarketChangePercent)
                break
            default: // REGULAR
                setPrice(regularMarketPrice)
                setPriceChange(regularMarketChange)
                setPriceChangePercent(regularMarketChangePercent)
                break
        }
        setVolume(shortenNumber(regularMarketVolume || 0))
    }, [item])

    const removeStockSymbol = () => {
        dispatch(removeStockSymbolList(symbol))
    }

    return {
        symbol,
        price,
        priceChange,
        priceChangePercent,
        volume,
        removeStockSymbol
    }
}
