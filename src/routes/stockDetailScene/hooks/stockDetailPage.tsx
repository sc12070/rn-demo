import { useCallback, useEffect, useState } from 'react'
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart'
import { ChartInfoModel } from 'store/apiDataModel/home'

export default (chartInfo: ChartInfoModel) => {
    const [data, setData] = useState<LineChartData>({
        labels: [],
        datasets: []
    })

    const { indicators, meta, timestamp } = chartInfo
    const { symbol } = meta
    const { close } = indicators.quote[0]

    const fillNull = useCallback((input: Array<number | null>) => {
        var output: Array<number | null> = [...input]
        while (output.indexOf(null) !== -1) {
            let idx = output.indexOf(null)
            if (idx === 0 && !!output[1]) {
                output[0] = output[1]
            } else {
                output[idx] = output[idx - 1]
            }
        }
        return output as Array<number>
    }, [])

    const calMinMaxBuffer = useCallback((list: Array<number>) => {
        let minBuffer = Math.min(...list)
        let maxBuffer = Math.max(...list)
        let minMaxDiff = (maxBuffer - minBuffer) * 0.2
        return [minBuffer - minMaxDiff, maxBuffer + minMaxDiff]
    }, [])

    useEffect(() => {
        let closeIndicatorList = fillNull(close)
        let minMax: number[] = calMinMaxBuffer(closeIndicatorList)

        setData({
            labels: timestamp.map(t => {
                let d = new Date(t * 1000)
                let min = d.getMinutes()
                if (min === 0) {
                    return `${d.getHours()}:${d.getMinutes()}0`
                } else {
                    return ''
                }
            }),
            datasets: [
                {
                    data: closeIndicatorList,
                    strokeWidth: 2,
                    withDots: false
                },
                {
                    data: minMax,
                    color: () => 'transparent',
                    strokeWidth: 0,
                    withDots: false
                }
            ]
        })
    }, [close, timestamp, fillNull, calMinMaxBuffer])

    return {
        symbol,
        data
    }
}

//https://query1.finance.yahoo.com/v11/finance/quoteSummary/aapl?modules=financialData
