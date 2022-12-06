import { CHANGE } from 'constants'
import { useEffect, useState, useRef } from 'react'
import { Animated } from 'react-native'
import { determindChange } from 'utils/numberHelper'

export interface StockPriceInfo {
    price: number
    change: CHANGE
    shouldAnimated?: boolean
    postfix?: string
}

const valuesOpacity = 0.7
const valuesOpacityOnAfterChange = 0.1

export default (info: StockPriceInfo) => {
    const { price, change, shouldAnimated } = info

    const [changeInUpdate, setChangeInUpdate] = useState<CHANGE>(CHANGE.Equal)
    const [isShowPriceUpdateStyle, setIsShowPriceUpdateStyle] = useState<boolean>(false)

    const prevPriceRef = useRef<number>(price)
    const fadeAnim = useRef(new Animated.Value(valuesOpacity)).current

    const fadeOut = () => {
        fadeAnim.setValue(1.0)
        setIsShowPriceUpdateStyle(true)
        Animated.timing(fadeAnim, {
            toValue: valuesOpacityOnAfterChange,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            setIsShowPriceUpdateStyle(false)
            fadeAnim.setValue(valuesOpacity)
        })
    }

    useEffect(() => {
        if (!shouldAnimated) {
            return
        }
        const _changeInUpdate = determindChange(price - prevPriceRef.current)
        if (_changeInUpdate !== CHANGE.Equal) {
            setChangeInUpdate(_changeInUpdate)
            fadeOut()
        }
        prevPriceRef.current = price
    }, [info])

    return {
        change: isShowPriceUpdateStyle ? changeInUpdate : change,
        fadeAnim
    }
}
