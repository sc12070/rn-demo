import { CHANGE } from 'constants'

interface ShortenNumber {
    (input: number): string
}

export const shortenNumber: ShortenNumber = (input: number) => {
    if (input > 1000000) {
        return `${(input / 1000000).toFixed(3)}M`
    } else if (input > 10000) {
        return `${(input / 1000).toFixed(3)}K`
    }
    return `${input}`
}

export const determindChange = (priceChange: number) =>
    priceChange === 0 ? CHANGE.Equal : priceChange > 0 ? CHANGE.Up : CHANGE.Down
