interface IParams {
    api: string
    query?: Array<string>
    method?: string
    controller?: AbortController
}

export const fetchRequest = async (params: IParams) => {
    try {
        const { api, query, method = 'GET', controller } = params
        console.log('fetchRequest request', api)
        let apiUrl = api
        if (query !== undefined && query.length > 0) {
            apiUrl = `${api}?${query.join('&')}`
        }
        const rslt = await fetch(apiUrl, {
            method,
            signal: controller?.signal
        })
        if (rslt?.status !== 200) {
            console.error('fetchRequest status error', rslt)
        }
        const response = await rslt.json()
        if (response?.error) {
            console.error('fetchRequest request fail', response)
            throw response
        }
        console.log(`fetchRequest success, ${api}`, response)
        return response
    } catch (e) {
        console.warn('fetchRequest fail', e)
        throw e
    }
}
