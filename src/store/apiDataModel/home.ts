export interface StockInfoModel {
    longName: string
    symbol: string
    preMarketPrice: number
    preMarketChange: number
    preMarketChangePercent: number
    regularMarketOpen: number
    regularMarketPrice: number
    regularMarketChange: number
    regularMarketChangePercent: number
    regularMarketVolume: number
    postMarketPrice: number
    postMarketChange: number
    postMarketChangePercent: number
    marketState: string
}

export interface IndicatorsModel {
    close: Array<number | null>
    volume: Array<number>
}

export interface ChartInfoModel {
    indicators: {
        quote: Array<IndicatorsModel>
    }
    meta: {
        symbol: string
        instrumentType: string
        previousClose: number
        regularMarketPrice: number
        exchangeName?: string
    }
    timestamp: Array<number>
}
