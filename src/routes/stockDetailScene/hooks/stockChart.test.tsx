import { renderHook } from '@testing-library/react-hooks'
import { renderWrapper } from 'utils/providerWrapper'
import { store } from 'store/store'

import useStockChart from './stockChart'

describe('Stock Detail', () => {
    test('chart', async () => {
        const close = [null, 1.1, 1.2, null, 1.3, 2.0, 1.5]
        const timestamp = [
            1671546600, 1671546900, 1671547200, 1671547500, 1671547800, 1671548100, 1671548400
        ]

        const hooks = renderHook(() => useStockChart(close, timestamp), {
            wrapper: renderWrapper(store)
        })
        const { result } = hooks
        expect(result.current.xAxisFormatter(1671546600)).toBe('14:30')
        expect(result.current.yAxisFormatter(2.123124)).toBe('2.12')
        expect(result.current.tooltipFormatter({ x: 1671546600, y: 2.123124 })).toBe('14:30 $2.12')
        expect(result.current.xAxisDomon).toStrictEqual({ min: 1671546600, max: 1671575400 })
        expect(result.current.yAxisDomon).toStrictEqual({ min: 0.9200000000000002, max: 2.18 })
        expect(result.current.dataForLinechart).toStrictEqual([
            {
                x: 1671546600,
                y: 1.1
            },
            {
                x: 1671546900,
                y: 1.1
            },
            {
                x: 1671547200,
                y: 1.2
            },
            {
                x: 1671547500,
                y: 1.2
            },
            {
                x: 1671547800,
                y: 1.3
            },
            {
                x: 1671548100,
                y: 2.0
            },
            {
                x: 1671548400,
                y: 1.5
            }
        ])
    })
})
