import React from 'react'
import { Animated } from 'react-native'
import styles from './styles'
import useStockPriceHooks, { StockPriceInfo } from '../../hooks/stockPriceHooks'
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

const StockPrice = (stockPriceInfo: StockPriceInfo) => {
    const { price, postfix } = stockPriceInfo
    const { change, fadeAnim } = useStockPriceHooks(stockPriceInfo)

    const priceStyles = [
        styles.text,
        styles.textInfo,
        getPriceChangeStyle(change),
        { opacity: fadeAnim }
    ]

    return (
        <Animated.Text numberOfLines={1} style={priceStyles}>
            {price?.toFixed(2)}
            {postfix}
        </Animated.Text>
    )
}

export default StockPrice
