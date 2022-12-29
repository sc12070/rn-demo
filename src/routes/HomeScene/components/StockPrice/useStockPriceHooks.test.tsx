import { renderHook } from '@testing-library/react-hooks'
import { renderWrapper } from 'utils/providerWrapper'
import { store } from 'store/store'
import useStockPriceHooks, { IStockPriceInfo } from './useStockPriceHooks'
import { CHANGE } from 'constants'

describe('Stock Price', () => {
    test('receive higher price', async () => {
        let stockPrice: IStockPriceInfo = {
            price: 100,
            change: CHANGE.Equal,
            shouldAnimated: true
        }
        const hooks = renderHook(() => useStockPriceHooks(stockPrice), {
            wrapper: renderWrapper(store)
        })
        const { result, waitForValueToChange } = hooks
        expect(result.current.price).toBe('100.00')
        expect(result.current.change).toBe(CHANGE.Equal)
        stockPrice = {
            price: 110,
            change: CHANGE.Equal,
            shouldAnimated: true
        }
        hooks.rerender()
        expect(result.current.price).toBe('110.00')
        expect(result.current.change).toBe(CHANGE.Up)
        await waitForValueToChange(() => result.current.change)
        expect(result.current.change).toBe(CHANGE.Equal)
    })

    test('receive lower price', async () => {
        let stockPrice: IStockPriceInfo = {
            price: 100,
            change: CHANGE.Up,
            shouldAnimated: true
        }
        const hooks = renderHook(() => useStockPriceHooks(stockPrice), {
            wrapper: renderWrapper(store)
        })
        const { result, waitForValueToChange } = hooks
        expect(result.current.price).toBe('100.00')
        expect(result.current.change).toBe(CHANGE.Up)
        stockPrice = {
            price: 90,
            change: CHANGE.Up,
            shouldAnimated: true
        }
        hooks.rerender()
        expect(result.current.price).toBe('90.00')
        expect(result.current.change).toBe(CHANGE.Down)
        await waitForValueToChange(() => result.current.change)
        expect(result.current.change).toBe(CHANGE.Up)
    })

    test('without animation', async () => {
        let stockPrice: IStockPriceInfo = {
            price: 100,
            change: CHANGE.Down
        }
        const hooks = renderHook(() => useStockPriceHooks(stockPrice), {
            wrapper: renderWrapper(store)
        })
        const { result } = hooks
        expect(result.current.price).toBe('100.00')
        expect(result.current.change).toBe(CHANGE.Down)
        stockPrice = {
            price: 110,
            change: CHANGE.Down
        }
        hooks.rerender()
        expect(result.current.price).toBe('110.00')
        expect(result.current.change).toBe(CHANGE.Down)
    })
})
