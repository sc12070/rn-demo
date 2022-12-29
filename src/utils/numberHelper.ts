import { CHANGE } from 'constants'

interface IShortenNumber {
    (input: number): string
}

export const shortenNumber: IShortenNumber = (input: number) => {
    if (input > 1000000) {
        return `${(input / 1000000).toFixed(3)}M`
    } else if (input > 10000) {
        return `${(input / 1000).toFixed(3)}K`
    }
    return `${input}`
}

export const toDecimal = (input: number, decimal: number = 2) => {
    return Math.round(input * 10 ** decimal) / 10 ** decimal
}

export const determindChange = (priceChange: number) =>
    priceChange === 0 ? CHANGE.Equal : priceChange > 0 ? CHANGE.Up : CHANGE.Down
