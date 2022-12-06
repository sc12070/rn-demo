import React from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles'

interface Route {
    params: {
        symbol: string
    }
}

const StockDetailPage = ({ route }: { route: Route }) => {
    return (
        <View style={styles.bg}>
            <Text style={{ color: 'black' }}>{route.params.symbol}</Text>
        </View>
    )
}

export default StockDetailPage
