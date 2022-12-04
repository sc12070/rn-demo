interface ShortenNumber {
    (input: number): string
}

export const shortenNumber: ShortenNumber = (input: number) => {
    if (input > 1000000) {
        return `${(input / 1000000).toFixed(2)}M`
    } else if (input > 1000) {
        return `${(input / 1000).toFixed(2)}k`
    }
    return `${input}`
}
