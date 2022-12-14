import { useNavigation } from '@react-navigation/native'
import { CHANGE } from 'constants'
import { useCallback, useEffect, useState } from 'react'
import { IChartInfo, IStockInfo } from 'store/apiDataModel/home'
import { useAppDispatch } from 'store/hooks'
import { removeStockSymbolList } from 'store/reducer/home/homeSlice'
import { determindChange, shortenNumber } from 'utils/numberHelper'

export default (item: IStockInfo) => {
    const { symbol } = item

    const [price, setPrice] = useState<number>(item.regularMarketPrice)
    const [priceChange, setPriceChange] = useState<number>(item.regularMarketChange)
    const [priceChangePercent, setPriceChangePercent] = useState<number>(
        item.regularMarketChangePercent
    )
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
                if (typeof preMarketPrice === 'number') {
                    setPrice(preMarketPrice)
                    setPriceChange(preMarketChange)
                    setPriceChangePercent(preMarketChangePercent)
                    setChange(determindChange(preMarketChange))
                }
                break
            case 'CLOSED':
                if (typeof postMarketPrice === 'number') {
                    setPrice(postMarketPrice)
                    setPriceChange(postMarketChange)
                    setPriceChangePercent(postMarketChangePercent)
                    setChange(determindChange(postMarketChange))
                }
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

    const toDetailPage = useCallback(async () => {
        const chartInfo: IChartInfo = {
            indicators: {
                quote: [{ close: [], volume: [] }]
            },
            meta: {
                symbol: symbol,
                instrumentType: '',
                previousClose: 0,
                regularMarketPrice: 0
            },
            timestamp: []
        }
        navigation.navigate('StockDetail' as never, { chartInfo: chartInfo } as never)
    }, [navigation, symbol])

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
