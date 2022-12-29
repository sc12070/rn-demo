import React from 'react'
import { FlatList, RefreshControl, Text, View } from 'react-native'
import styles from './styles'
import useHomePageHooks from './useHomePageHooks'
import StockItem from './components/StockItem/StockItem'
import SymbolInput from './components/SymbolInput/SymbolInput'
import { IStockInfo } from 'store/apiDataModel/home'

const HomePage = () => {
    const { refreshing, stockList, refreshHandler } = useHomePageHooks()

    const renderItem = ({ item, index }: { item: IStockInfo; index: number }) => (
        <StockItem item={item} index={index} />
    )

    const keyExtractor = ({ symbol }: IStockInfo) => symbol

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
