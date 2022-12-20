import { useCallback, useState } from 'react'
import { Alert } from 'react-native'
import { ChartInfoModel } from 'store/apiDataModel/home'

import { useAppDispatch } from 'store/hooks'
import { appendStockSymbolList, fetchChart } from 'store/reducer/home/homeActions'

export default () => {
    const [symbolInput, setSymbolInput] = useState('')

    const dispatch = useAppDispatch()

    const addStockSymbol = useCallback(async () => {
        if (symbolInput === '') {
            return
        }
        const rslt = await dispatch(fetchChart(symbolInput))
        const list = rslt.payload?.chart?.result as Array<ChartInfoModel>
        if (!list || list.length === 0) {
            Alert.alert('Error', `Equity with symbpl ${symbolInput} not found`)
            return
        }
        const equityData = list.filter(d => d.meta.instrumentType === 'EQUITY')
        console.log(equityData)
        if (equityData.length > 0) {
            dispatch(appendStockSymbolList(symbolInput.toUpperCase()))
            setSymbolInput('')
        } else {
            Alert.alert('Sorry', 'We only support equity now')
        }
    }, [dispatch, symbolInput])

    return {
        symbolInput,
        setSymbolInput,
        addStockSymbol
    }
}
