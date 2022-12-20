import { renderHook } from '@testing-library/react-hooks'
import { renderWrapper } from 'utils/providerWrapper'
import { store } from 'store/store'

import useStockDetailPage from './stockDetailPage'
import { ChartInfoModel } from 'store/apiDataModel/home'

describe('Stock Detail', () => {
    test('chart', async () => {
        let chartInfo: ChartInfoModel = {
            indicators: {
                quote: [
                    {
                        close: [null, 1.1, 1.2, null, 1.3, 2.0, 1.5],
                        volume: []
                    }
                ]
            },
            meta: {
                symbol: 'AAPL',
                instrumentType: 'EQUITY',
                regularMarketPrice: 1.5
            },
            timestamp: [
                1671546600, 1671546900, 1671547200, 1671547500, 1671547800, 1671548100, 1671548400
            ]
        }
        const hooks = renderHook(() => useStockDetailPage(chartInfo), {
            wrapper: renderWrapper(store)
        })
        const { result } = hooks
        expect(result.current.data.datasets[0].data).toStrictEqual([
            1.1, 1.1, 1.2, 1.2, 1.3, 2, 1.5
        ])
        expect(result.current.data.datasets[1].data.map(d => d.toFixed(2))).toStrictEqual([
            '0.92',
            '2.18'
        ])
        expect(result.current.data.labels).toStrictEqual(['', '', '', '', '', '', '15:00'])
    })
})
