import { ChartDataPoint } from 'react-native-responsive-linechart'

export const fillNull = (input: Array<number | null>) => {
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
}

export const getLowHigh = (list: Array<number>) => {
    let minBuffer = Math.min(...list)
    let maxBuffer = Math.max(...list)
    let minMaxDiff = Math.max((maxBuffer - minBuffer) * 0.2, 0.04)
    return { min: minBuffer - minMaxDiff, max: maxBuffer + minMaxDiff }
}

export const getTimeRange = (start: number) => ({ min: start, max: start + 25200 })

export const xAxisFormatter = (value: number) => {
    let d = new Date(value * 1000)
    return d.toTimeString().substring(0, 5)
}

export const yAxisFormatter = (value: number) => value.toFixed(2)

export const tooltipFormatter = ({ x, y }: ChartDataPoint) => {
    let d = new Date(x * 1000)
    return `${d.toTimeString().substring(0, 5)} $${y.toFixed(2)}`
}
