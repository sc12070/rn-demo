import React from 'react'
import { ScrollView, Text, TouchableOpacity, View, Animated } from 'react-native'
import styles from './styles'
import useStockItemHooks from '../../hooks/stockItemHooks'
import { StockInfo } from 'store/reducer/home/homeSlice'
import StockPrice from '../stockPrice/stockPrice'

const StockItem = ({ item, index }: { item: StockInfo; index: number }) => {
    const {
        symbol,
        price,
        priceChange,
        priceChangePercent,
        change,
        volume,
        removeStockSymbol,
        toDetailPage
    } = useStockItemHooks(item)

    const oddWrapper = index % 2 == 0 ? styles.oddWrapper : null

    return (
        <ScrollView
            contentContainerStyle={styles.swipeWrapper}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}>
            <TouchableOpacity style={[styles.stockItemWrapper, oddWrapper]} onPress={toDetailPage}>
                <View style={styles.stockItem}>
                    <Text style={styles.text}>{symbol}</Text>
                    <StockPrice price={price} change={change} shouldAnimated={true} />
                    <StockPrice price={priceChange} change={change} />
                    <StockPrice price={priceChangePercent} change={change} postfix="%" />
                    <Text numberOfLines={1} style={[styles.text, styles.textInfo]}>
                        {volume}
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.deleteBtn, oddWrapper]} onPress={removeStockSymbol}>
                <Text style={styles.deleteBtnLabel}>X</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default StockItem
