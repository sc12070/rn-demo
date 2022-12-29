import { useNavigation } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { Alert } from 'react-native'
import { IChartInfo } from 'store/apiDataModel/home'

import { useAppDispatch } from 'store/hooks'
import { appendStockSymbolList, fetchChart } from 'store/reducer/home/homeActions'

export default () => {
    const [symbolInput, setSymbolInput] = useState('')

    const dispatch = useAppDispatch()
    const navigation = useNavigation()

    const addStockSymbol = useCallback(async () => {
        if (symbolInput === '') {
            return
        }
        const rslt = await dispatch(fetchChart(symbolInput))
        const list = rslt.payload?.chart?.result as Array<IChartInfo>
        if (!list || list.length === 0) {
            Alert.alert('', `Equity with symbol '${symbolInput}' not found`)
            return
        }
        const equityData = list.filter(d => d.meta.instrumentType === 'EQUITY')
        if (equityData.length > 0) {
            dispatch(appendStockSymbolList(symbolInput.toUpperCase()))
            setSymbolInput('')
            navigation.navigate('StockDetail' as never, { chartInfo: equityData[0] } as never)
        } else {
            Alert.alert('Sorry', 'We only support equity now')
        }
    }, [dispatch, navigation, symbolInput])

    return {
        symbolInput,
        setSymbolInput,
        addStockSymbol
    }
}
