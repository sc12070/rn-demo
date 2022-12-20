import React from 'react'
import { Dimensions, Text, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackParamList } from 'routes/routesType'
import styles from './styles'
import { LineChart } from 'react-native-chart-kit'
import useStockDetailPage from '../hooks/stockDetailPage'

type StockDetailPageProps = NativeStackScreenProps<StackParamList, 'StockDetail'>

const StockDetailPage = ({ route }: StockDetailPageProps) => {
    const { symbol, data } = useStockDetailPage(route.params.chartInfo)

    return (
        <View style={styles.bg}>
            <Text style={styles.text}>{symbol}</Text>
            <LineChart
                data={data}
                width={Dimensions.get('window').width - 20}
                height={220}
                withInnerLines={false}
                withShadow={false}
                chartConfig={{
                    backgroundColor: '#FFF',
                    backgroundGradientFrom: '#EEE',
                    backgroundGradientTo: '#FFF',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16
                    }
                }}
            />
        </View>
    )
}

export default StockDetailPage
