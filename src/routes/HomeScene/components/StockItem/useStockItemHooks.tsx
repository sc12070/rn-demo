import { useNavigation } from '@react-navigation/native'
import { CHANGE } from 'constants'
import { useCallback, useMemo } from 'react'
import { IChartInfo, IStockInfo } from 'store/apiDataModel/home'
import { useAppDispatch } from 'store/hooks'
import { removeStockSymbolList } from 'store/reducer/home/homeSlice'
import { determindChange, shortenNumber } from 'utils/numberHelper'

export default (item: IStockInfo) => {
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

    const price = useMemo<number>(() => {
        if (marketState === 'PRE' && typeof preMarketPrice === 'number') {
            return preMarketPrice
        } else if (marketState === 'CLOSED' && typeof postMarketPrice === 'number') {
            return postMarketPrice
        }
        return regularMarketPrice
    }, [preMarketPrice, regularMarketPrice, postMarketPrice, marketState])

    const priceChange = useMemo<number>(() => {
        if (marketState === 'PRE' && typeof preMarketChange === 'number') {
            return preMarketChange
        } else if (marketState === 'CLOSED' && typeof postMarketChange === 'number') {
            return postMarketChange
        }
        return regularMarketChange
    }, [preMarketChange, regularMarketChange, postMarketChange, marketState])

    const priceChangePercent = useMemo<number>(() => {
        if (marketState === 'PRE' && typeof preMarketChangePercent === 'number') {
            return preMarketChangePercent
        } else if (marketState === 'CLOSED' && typeof postMarketChangePercent === 'number') {
            return postMarketChangePercent
        }
        return regularMarketChangePercent
    }, [preMarketChangePercent, regularMarketChangePercent, postMarketChangePercent, marketState])

    const change = useMemo<CHANGE>(() => determindChange(priceChange), [priceChange])

    const volume = useMemo<string>(
        () => shortenNumber(regularMarketVolume || 0),
        [regularMarketVolume]
    )

    const dispatch = useAppDispatch()
    const navigation = useNavigation()

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
