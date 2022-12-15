import React from 'react'
import { FlatList, RefreshControl, Text, View } from 'react-native'
import styles from './styles'
import useHomePageHooks from '../hooks/homePageHooks'
import { StockInfo } from 'store/reducer/home/homeSlice'
import StockItem from './stockItem/stockItem'
import SymbolInput from './symbolInput/symbolInput'

const HomePage = () => {
    const { refreshing, stockList, refreshHandler } = useHomePageHooks()

    const renderItem = ({ item, index }: { item: StockInfo; index: number }) => (
        <StockItem item={item} index={index} />
    )

    const keyExtractor = ({ symbol }: StockInfo) => symbol

    return (
        <View style={styles.bg}>
            <SymbolInput />
            <View style={[styles.rowWrapper, styles.stockListWrapper]}>
                <Text style={styles.text}>Symbol</Text>
                <Text style={[styles.text, styles.textInfo]}>Last</Text>
                <Text style={[styles.text, styles.textInfo]}>Change</Text>
                <Text style={[styles.text, styles.textInfo]}>Change%</Text>
                <Text style={[styles.text, styles.textInfo]}>Volume</Text>
            </View>
            <FlatList
                data={stockList}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refreshHandler} />
                }
            />
        </View>
    )
}

export default HomePage
