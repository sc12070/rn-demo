import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import useStockItemHooks from '../../hooks/stockItemHooks'
import { StockInfo } from 'store/reducer/home/homeSlice'

const StockItem = ({ item, index }: { item: StockInfo; index: number }) => {
    const { symbol, price, priceChange, priceChangePercent, volume, removeStockSymbol } =
        useStockItemHooks(item)

    const priceChangeStyle =
        priceChange == 0
            ? styles.priceChange
            : priceChange > 0
            ? styles.priceChangePlus
            : styles.priceChangeMinus

    const oddWrapper = index % 2 == 0 ? styles.oddWrapper : null

    return (
        <ScrollView
            contentContainerStyle={styles.swipeWrapper}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}>
            <View style={[styles.stockItemWrapper, oddWrapper]}>
                <Text style={styles.text}>{symbol}</Text>
                <Text numberOfLines={1} style={[styles.text, styles.textInfo, priceChangeStyle]}>
                    {price?.toFixed(2)}
                </Text>
                <Text numberOfLines={1} style={[styles.text, styles.textInfo, priceChangeStyle]}>
                    {priceChange?.toFixed(2)}
                </Text>
                <Text numberOfLines={1} style={[styles.text, styles.textInfo, priceChangeStyle]}>
                    {priceChangePercent?.toFixed(2)}%
                </Text>
                <Text numberOfLines={1} style={[styles.text, styles.textInfo]}>
                    {volume}
                </Text>
            </View>
            <TouchableOpacity style={[styles.deleteBtn, oddWrapper]} onPress={removeStockSymbol}>
                <Text style={styles.deleteBtnLabel}>X</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default StockItem
