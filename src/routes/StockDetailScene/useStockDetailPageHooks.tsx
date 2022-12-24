import { useCallback, useEffect, useRef, useState } from 'react'

import { ChartInfoModel } from 'store/apiDataModel/home'
import { useAppDispatch } from 'store/hooks'
import { fetchChart } from 'store/reducer/home/homeActions'

export default (info: ChartInfoModel) => {
    const { meta, timestamp } = info

    const [chartInfo, setChartInfo] = useState<ChartInfoModel>(info)

    const dispatch = useAppDispatch()

    let timerId = useRef<ReturnType<typeof setInterval> | null>(null)

    const fetchChartInfo = useCallback(async () => {
        const rslt = await dispatch(fetchChart(meta.symbol))
        const list = rslt.payload?.chart?.result as Array<ChartInfoModel>
        const chartInfoList = list.filter(d => d.meta.instrumentType === 'EQUITY')
        if (chartInfoList.length > 0) {
            setChartInfo(chartInfoList[0])
        }
    }, [dispatch, meta.symbol])

    useEffect(() => {
        if (timestamp.length === 0) {
            fetchChartInfo()
        }
        const id = setInterval(() => {
            fetchChartInfo()
        }, 6000)
        timerId.current = id

        return () => {
            if (timerId.current !== null) {
                clearInterval(timerId.current)
            }
        }
    }, [fetchChartInfo, timestamp])

    return {
        chartInfo
    }
}
