import { CHANGE } from 'constants'
import { useEffect, useState } from 'react'
import { useAppDispatch } from 'store/hooks'
import { removeStockSymbolList } from 'store/reducer/home/homeActions'
import { StockInfo } from 'store/reducer/home/homeSlice'
import { determindChange, shortenNumber } from 'utils/numberHelper'

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

    const [price, setPrice] = useState<number>(regularMarketPrice)
    const [priceChange, setPriceChange] = useState<number>(0)
    const [priceChangePercent, setPriceChangePercent] = useState<number>(0)
    const [change, setChange] = useState<CHANGE>(CHANGE.Equal)
    const [volume, setVolume] = useState<string>(shortenNumber(regularMarketVolume || 0))

    const dispatch = useAppDispatch()

    useEffect(() => {
        switch (marketState) {
            case 'PRE':
                setPrice(preMarketPrice)
                setPriceChange(preMarketChange)
                setPriceChangePercent(preMarketChangePercent)
                setChange(determindChange(preMarketChange))
                break
            case 'CLOSED':
                setPrice(postMarketPrice)
                setPriceChange(postMarketChange)
                setPriceChangePercent(postMarketChangePercent)
                setChange(determindChange(postMarketChange))
                break
            default: // REGULAR
                setPrice(regularMarketPrice)
                setPriceChange(regularMarketChange)
                setPriceChangePercent(regularMarketChangePercent)
                setChange(determindChange(regularMarketChange))
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
        change,
        volume,
        removeStockSymbol
    }
}
