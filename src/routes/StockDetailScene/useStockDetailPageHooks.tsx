import { useCallback, useEffect, useRef, useState } from 'react'

import { IChartInfo } from 'store/apiDataModel/home'
import { useAppDispatch } from 'store/hooks'
import { fetchChart } from 'store/reducer/home/homeActions'

export default (info: IChartInfo) => {
    const { meta, timestamp } = info

    const [chartInfo, setChartInfo] = useState<IChartInfo>(info)

    const dispatch = useAppDispatch()

    let timerId = useRef<ReturnType<typeof setInterval> | null>(null)

    const fetchChartInfo = useCallback(async () => {
        const rslt = await dispatch(fetchChart(meta.symbol))
        const list = rslt.payload?.chart?.result as Array<IChartInfo>
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
