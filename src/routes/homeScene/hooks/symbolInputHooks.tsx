import { useCallback, useState } from 'react'

import { useAppDispatch } from 'store/hooks'
import { appendStockSymbolList } from 'store/reducer/home/homeActions'

export default () => {
    const [symbolInput, setSymbolInput] = useState('')

    const dispatch = useAppDispatch()

    const addStockSymbol = useCallback(() => {
        if (symbolInput === '') {
            return
        }
        dispatch(appendStockSymbolList(symbolInput.toUpperCase()))
        setSymbolInput('')
    }, [symbolInput])

    return {
        symbolInput,
        setSymbolInput,
        addStockSymbol
    }
}
