import { useCallback, useEffect, useRef, useState } from 'react'

import { IChartInfo } from 'store/apiDataModel/home'
import { useAppDispatch } from 'store/hooks'
import { fetchChart } from 'store/reducer/home/homeSlice'

export default (info: IChartInfo) => {
    const { meta, timestamp } = info

    const [chartInfo, setChartInfo] = useState<IChartInfo>(info)

    const dispatch = useAppDispatch()

    let timerId = useRef<ReturnType<typeof setInterval> | null>(null)

    const fetchChartInfo = useCallback(
        async (controller: AbortController) => {
            const rslt = await dispatch(fetchChart({ symbol: meta.symbol, controller }))
            const list = rslt.payload?.chart?.result as Array<IChartInfo>
            if (list === undefined) {
                return
            }
            const chartInfoList = list.filter(d => d.meta.instrumentType === 'EQUITY')
            if (chartInfoList.length > 0) {
                setChartInfo(chartInfoList[0])
            }
        },
        [dispatch, meta.symbol]
    )

    useEffect(() => {
        const controller = new AbortController()
        if (timestamp.length === 0) {
            fetchChartInfo(controller)
        }
        const id = setInterval(() => {
            fetchChartInfo(controller)
        }, 6000)
        timerId.current = id

        return () => {
            controller.abort()
            if (timerId.current !== null) {
                clearInterval(timerId.current)
            }
        }
    }, [fetchChartInfo, timestamp])

    return {
        chartInfo
    }
}
