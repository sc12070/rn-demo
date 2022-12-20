// TODO: remove next line
/* eslint-disable */
import React from 'react'
import { Dimensions, Text, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackParamList } from 'routes/routesType'
import styles from './styles'
import { LineChart } from 'react-native-chart-kit'

type StockDetailPageProps = NativeStackScreenProps<StackParamList, 'StockDetail'>

const StockDetailPage = ({ route }: StockDetailPageProps) => {
    const { chartInfo } = route?.params
    const { indicators, meta, timestamp } = chartInfo
    const { symbol } = meta
    // const { close } = indicators.quote[0]

    // let data = {
    //     labels: timestamp.map(t => {
    //         let d = new Date(t * 1000)
    //         let min = d.getMinutes()
    //         if (min === 0) {
    //             return `${d.getHours()}:${d.getMinutes()}0`
    //         } else {
    //             return ''
    //         }
    //     }),
    //     datasets: [
    //         {
    //             data: close,
    //             strokeWidth: 1,
    //             withDots: false
    //         },
    //         {
    //             data: [Math.min(...close), Math.max(...close)],
    //             color: () => 'transparent',
    //             strokeWidth: 0,
    //             withDots: false
    //             //backgroundColor: () => 'transparent'
    //         }
    //     ]
    // }

    return (
        <View style={styles.bg}>
            <Text style={styles.text}>{symbol}</Text>
            {/* <LineChart
                data={data}
                width={Dimensions.get('window').width - 20}
                height={220}
                withInnerLines={false}
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
            /> */}
        </View>
    )
}

export default StockDetailPage
