import { useMemo } from 'react'
import { AxisDomain, ChartDataPoint } from 'react-native-responsive-linechart'
import { fillNull, getLowHigh, getTimeRange } from 'utils/ChartDataHelper'

export default (close: Array<number | null>, timestamp: Array<number>) => {
    const closeIndicatorList = useMemo<Array<number>>(() => fillNull(close), [close])

    const dataForLinechart = useMemo<Array<ChartDataPoint>>(
        () =>
            closeIndicatorList.map((value, idx) => {
                return { y: value, x: timestamp[idx] }
            }),
        [timestamp, closeIndicatorList]
    )

    const xAxisDomon = useMemo<AxisDomain>(
        () => getTimeRange(timestamp[0] || Date.now()),
        [timestamp]
    )

    const yAxisDomon = useMemo<AxisDomain>(
        () => getLowHigh(closeIndicatorList),
        [closeIndicatorList]
    )

    return {
        dataForLinechart,
        xAxisDomon,
        yAxisDomon
    }
}
