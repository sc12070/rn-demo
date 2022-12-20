import { useNavigation } from '@react-navigation/native'
import { CHANGE } from 'constants'
import { useCallback, useEffect, useState } from 'react'
import { ChartInfoModel, StockInfoModel } from 'store/apiDataModel/home'
import { useAppDispatch } from 'store/hooks'
import { fetchChart, removeStockSymbolList } from 'store/reducer/home/homeActions'
import { determindChange, shortenNumber } from 'utils/numberHelper'

export default (item: StockInfoModel) => {
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
        const rslt = await dispatch(fetchChart(symbol))
        const list = rslt.payload?.chart?.result as Array<ChartInfoModel>
        const chartInfoList = list.filter(d => d.meta.instrumentType === 'EQUITY')
        if (chartInfoList.length > 0) {
            navigation.navigate('StockDetail' as never, { chartInfo: chartInfoList[0] } as never)
        }
    }, [dispatch, navigation, symbol])

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
