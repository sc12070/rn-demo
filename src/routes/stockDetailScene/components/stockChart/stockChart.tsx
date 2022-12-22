import React from 'react'
import {
    Chart,
    VerticalAxis,
    HorizontalAxis,
    Line,
    Tooltip
} from 'react-native-responsive-linechart'

import styles from './styles'
import useStockChart from '../../hooks/stockChart'

const StockChart = ({
    close,
    timestamp
}: {
    close: Array<number | null>
    timestamp: Array<number>
}) => {
    const {
        dataForLinechart,
        yAxisDomon,
        xAxisDomon,
        xAxisFormatter,
        yAxisFormatter,
        tooltipFormatter
    } = useStockChart(close, timestamp)

    if (close.length === 0 || timestamp.length === 0) {
        return null
    }

    const tooltip = (
        <Tooltip
            theme={{
                shape: styles.tooltipShape,
                formatter: tooltipFormatter
            }}
        />
    )

    return (
        /* @ts-ignore */
        <Chart
            style={styles.chartBg}
            xDomain={xAxisDomon}
            yDomain={yAxisDomon}
            padding={styles.chartPadding}>
            <VerticalAxis
                tickCount={6}
                theme={{
                    labels: {
                        formatter: yAxisFormatter
                    }
                }}
            />
            <HorizontalAxis tickCount={8} theme={{ labels: { formatter: xAxisFormatter } }} />
            <Line
                data={dataForLinechart}
                smoothing="none"
                theme={{ stroke: styles.stroke }}
                tooltipComponent={tooltip}
            />
        </Chart>
    )
}

export default StockChart
