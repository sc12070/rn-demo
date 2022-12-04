import React from 'react'
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles'
import useHomePageHooks from '../hooks/homePageHooks'
import { StockInfo } from 'store/reducer/home/homeSlice'
import StockItem from './stockItem/stockItem'

const HomePage = () => {
    const { symbolInput, stockList, setSymbolInput, addStockSymbol } = useHomePageHooks()

    const renderItem = ({ item, index }: { item: StockInfo; index: number }) => (
        <StockItem item={item} index={index} />
    )

    const keyExtractor = ({ symbol }: StockInfo) => symbol

    return (
        <View style={styles.bg}>
            <View style={styles.rowWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="Symbol"
                    value={symbolInput}
                    onChangeText={setSymbolInput}
                />
                <TouchableOpacity style={styles.searchBtn} onPress={() => addStockSymbol()}>
                    <Icon name="search" size={30} color="#BBB" />
                </TouchableOpacity>
            </View>
            <View style={[styles.rowWrapper, styles.stockListWrapper]}>
                <Text style={styles.text}>Symbol</Text>
                <Text style={[styles.text, styles.textInfo]}>Last</Text>
                <Text style={[styles.text, styles.textInfo]}>Change</Text>
                <Text style={[styles.text, styles.textInfo]}>Change%</Text>
                <Text style={[styles.text, styles.textInfo]}>Volume</Text>
            </View>
            <FlatList data={stockList} renderItem={renderItem} keyExtractor={keyExtractor} />
        </View>
    )
}

export default HomePage
