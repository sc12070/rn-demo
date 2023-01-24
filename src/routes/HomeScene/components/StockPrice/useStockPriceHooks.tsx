import { CHANGE } from 'constants/index'
import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { Animated } from 'react-native'
import { determindChange } from 'utils/numberHelper'

export interface IStockPriceInfo {
    price: number
    change: CHANGE
    shouldAnimated?: boolean
    postfix?: string
}

const valuesOpacity = 0.7
const valuesOpacityOnAfterChange = 0.1

export default (info: IStockPriceInfo) => {
    const { price, change } = info

    const [changeInUpdate, setChangeInUpdate] = useState<CHANGE>(CHANGE.Equal)
    const [isShowPriceUpdateStyle, setIsShowPriceUpdateStyle] = useState<boolean>(false)

    const priceString = useMemo<string>(() => `${price?.toFixed(2) || ''}`, [price])
    const changeDisplay = useMemo<CHANGE>(
        () => (isShowPriceUpdateStyle ? changeInUpdate : change),
        [isShowPriceUpdateStyle, changeInUpdate, change]
    )

    const prevPriceRef = useRef<number>(info.price)
    const fadeAnim = useRef(new Animated.Value(valuesOpacity)).current

    const fadeOut = useCallback(() => {
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
    }, [fadeAnim])

    useEffect(() => {
        const { shouldAnimated } = info
        if (!shouldAnimated) {
            return
        }
        const _changeInUpdate = determindChange(info.price - prevPriceRef.current)
        if (_changeInUpdate !== CHANGE.Equal) {
            setChangeInUpdate(_changeInUpdate)
            fadeOut()
        }
        prevPriceRef.current = info.price
    }, [info, fadeOut])

    return {
        price: priceString,
        change: changeDisplay,
        fadeAnim
    }
}
