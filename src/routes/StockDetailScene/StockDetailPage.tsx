import React from 'react'
import { Text, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { StackParamList } from 'routes/routesType'
import styles from './styles'
import useStockDetailPage from './useStockDetailPageHooks'
import StockChart from './components/StockChart/StockChart'

type StockDetailPageProps = NativeStackScreenProps<StackParamList, 'StockDetail'>

const StockDetailPage = ({ route }: StockDetailPageProps) => {
    const { chartInfo } = useStockDetailPage(route.params?.chartInfo)

    const { indicators, meta, timestamp } = chartInfo
    const { close } = indicators.quote[0]
    const { symbol, regularMarketPrice, previousClose, exchangeName } = meta

    return (
        <View style={styles.bg}>
            <Text style={[styles.text, styles.title]}>{symbol}</Text>
            <View style={styles.priceWrapper}>
                <Text style={styles.text}>${regularMarketPrice}</Text>
                <Text style={styles.text}>prev. ${previousClose}</Text>
                <View />
            </View>
            <Text style={styles.text}>Exchange: {exchangeName}</Text>
            <StockChart close={close} timestamp={timestamp} />
        </View>
    )
}

export default StockDetailPage
