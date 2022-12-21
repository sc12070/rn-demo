import { useCallback, useEffect, useState } from 'react'
import { AxisDomain, ChartDataPoint } from 'react-native-responsive-linechart'

export default (close: Array<number | null>, timestamp: Array<number>) => {
    const [dataForLinechart, setDataForLinechart] = useState<Array<ChartDataPoint>>([])
    const [yAxisDomon, setYAxisDomain] = useState<AxisDomain>({ min: 0, max: 0 })
    const [xAxisDomon, setXAxisDomain] = useState<AxisDomain>({ min: 0, max: 0 })

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

    const getLowHigh = useCallback((list: Array<number>) => {
        let minBuffer = Math.min(...list)
        let maxBuffer = Math.max(...list)
        let minMaxDiff = Math.max((maxBuffer - minBuffer) * 0.2, 0.04)
        return { min: minBuffer - minMaxDiff, max: maxBuffer + minMaxDiff }
    }, [])

    const getTimeRange = useCallback((start: number) => {
        return { min: start, max: start + 28800 }
    }, [])

    const xAxisFormatter = useCallback((value: number) => {
        let d = new Date(value * 1000)
        return d.toTimeString().substring(0, 5)
    }, [])

    const yAxisFormatter = useCallback((value: number) => value.toFixed(2), [])

    const tooltipFormatter = useCallback(({ x, y }: ChartDataPoint) => {
        let d = new Date(x * 1000)
        return `${d.toTimeString().substring(0, 5)} $${y.toFixed(2)}`
    }, [])

    useEffect(() => {
        let closeIndicatorList = fillNull(close)
        let data = closeIndicatorList.map((value, idx) => {
            return { y: value, x: timestamp[idx] }
        })
        setDataForLinechart(data)

        setYAxisDomain(getLowHigh(closeIndicatorList))
        setXAxisDomain(getTimeRange(timestamp[0] || Date.now()))
    }, [close, timestamp, fillNull, getLowHigh, getTimeRange])

    return {
        dataForLinechart,
        xAxisDomon,
        yAxisDomon,
        xAxisFormatter,
        yAxisFormatter,
        tooltipFormatter
    }
}
