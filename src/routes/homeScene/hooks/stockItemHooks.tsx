import { useNavigation } from '@react-navigation/native'
import { CHANGE } from 'constants'
import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch } from 'store/hooks'
import { removeStockSymbolList } from 'store/reducer/home/homeActions'
import { StockInfo } from 'store/reducer/home/homeSlice'
import { determindChange, shortenNumber } from 'utils/numberHelper'

export default (item: StockInfo) => {
    const { symbol } = item

    const [price, setPrice] = useState<number>(item.regularMarketPrice)
    const [priceChange, setPriceChange] = useState<number>(0)
    const [priceChangePercent, setPriceChangePercent] = useState<number>(0)
    const [change, setChange] = useState<CHANGE>(CHANGE.Equal)
    const [volume, setVolume] = useState<string>(shortenNumber(item.regularMarketVolume || 0))

    const dispatch = useAppDispatch()
    const navigation = useNavigation()

    useEffect(() => {
        const {
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
    }, [dispatch, item])

    const removeStockSymbol = useCallback(() => {
        dispatch(removeStockSymbolList(symbol))
    }, [dispatch, symbol])

    const toDetailPage = useCallback(
        () => navigation.navigate('StockDetail' as never, { symbol } as never),
        [navigation, symbol]
    )

    return {
        symbol,
        price,
        priceChange,
        priceChangePercent,
        change,
        volume,
        removeStockSymbol,
        toDetailPage
    }
}
