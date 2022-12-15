import React from 'react'
import { Text, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackParamList } from 'routes/routesType'
import styles from './styles'

type StockDetailPageProps = NativeStackScreenProps<StackParamList, 'StockDetail'>

const StockDetailPage = ({ route }: StockDetailPageProps) => {
    return (
        <View style={styles.bg}>
            <Text style={{ color: 'black' }}>{route.params.symbol}</Text>
        </View>
    )
}

export default StockDetailPage
