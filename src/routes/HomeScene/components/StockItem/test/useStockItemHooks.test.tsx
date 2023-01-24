import { renderHook } from '@testing-library/react-hooks'
import { renderWrapper } from 'utils/providerWrapper'
import { store } from 'store/store'

import useStockItemHooks from '../useStockItemHooks'
import { CHANGE } from 'constants/index'
import { IStockInfo } from 'store/apiDataModel/home'

describe('Stock Item', () => {
    test('pre-market', () => {
        const preStockInfo: IStockInfo = {
            longName: 'apple',
            symbol: 'AAPL',
            preMarketPrice: 1.0,
            preMarketChange: 0.1,
            preMarketChangePercent: 10.0,
            regularMarketOpen: 2.0,
            regularMarketPrice: 1.0,
            regularMarketChange: -1.0,
            regularMarketChangePercent: -50,
            regularMarketVolume: 100000,
            postMarketPrice: 5.0,
            postMarketChange: 0.5,
            postMarketChangePercent: 10,
            marketState: 'PRE'
        }
        const { result } = renderHook(() => useStockItemHooks(preStockInfo), {
            wrapper: renderWrapper(store)
        })
        expect(result.current.symbol).toBe('AAPL')
        expect(result.current.price).toBe(1)
        expect(result.current.priceChange).toBe(0.1)
        expect(result.current.priceChangePercent).toBe(10)
        expect(result.current.change).toBe(CHANGE.Up)
        expect(result.current.volume).toBe('100.000K')
    })

    test('regular-market', () => {
        const preStockInfo: IStockInfo = {
            longName: 'apple',
            symbol: 'AAPL',
            preMarketPrice: 1.0,
            preMarketChange: 0.1,
            preMarketChangePercent: 10.0,
            regularMarketOpen: 8.5,
            regularMarketPrice: 5.5,
            regularMarketChange: -3.0,
            regularMarketChangePercent: -50,
            regularMarketVolume: 10000000,
            postMarketPrice: 4.0,
            postMarketChange: 0.5,
            postMarketChangePercent: 10,
            marketState: 'REGULAR'
        }
        const { result } = renderHook(() => useStockItemHooks(preStockInfo), {
            wrapper: renderWrapper(store)
        })
        expect(result.current.symbol).toBe('AAPL')
        expect(result.current.price).toBe(5.5)
        expect(result.current.priceChange).toBe(-3)
        expect(result.current.priceChangePercent).toBe(-50.0)
        expect(result.current.change).toBe(CHANGE.Down)
        expect(result.current.volume).toBe('10.000M')
    })

    test('post-market', () => {
        const preStockInfo: IStockInfo = {
            longName: 'apple',
            symbol: 'AAPL',
            preMarketPrice: 1.0,
            preMarketChange: 0.1,
            preMarketChangePercent: 10.0,
            regularMarketOpen: 8.5,
            regularMarketPrice: 5.5,
            regularMarketChange: -3.0,
            regularMarketChangePercent: -50,
            regularMarketVolume: 100,
            postMarketPrice: 4.0,
            postMarketChange: 0.5,
            postMarketChangePercent: 10,
            marketState: 'CLOSED'
        }
        const { result } = renderHook(() => useStockItemHooks(preStockInfo), {
            wrapper: renderWrapper(store)
        })
        expect(result.current.symbol).toBe('AAPL')
        expect(result.current.price).toBe(4)
        expect(result.current.priceChange).toBe(0.5)
        expect(result.current.priceChangePercent).toBe(10.0)
        expect(result.current.change).toBe(CHANGE.Up)
        expect(result.current.volume).toBe('100')
    })
})
