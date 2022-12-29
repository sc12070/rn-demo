import React from 'react'
import { Animated } from 'react-native'
import styles from './styles'
import useStockPriceHooks, { IStockPriceInfo } from './useStockPriceHooks'
import { CHANGE } from 'constants'

const getPriceChangeStyle = (change: CHANGE) => {
    switch (change) {
        case CHANGE.Up:
            return styles.priceChangePlus
        case CHANGE.Down:
            return styles.priceChangeMinus
        default:
            return styles.priceChangeEqual
    }
}

const StockPrice = (stockPriceInfo: IStockPriceInfo) => {
    const { postfix } = stockPriceInfo
    const { price, change, fadeAnim } = useStockPriceHooks(stockPriceInfo)

    const priceStyles = [
        styles.text,
        styles.textInfo,
        getPriceChangeStyle(change),
        { opacity: fadeAnim }
    ]

    return (
        <Animated.Text numberOfLines={1} style={priceStyles}>
            {price}
            {postfix}
        </Animated.Text>
    )
}

export default StockPrice
