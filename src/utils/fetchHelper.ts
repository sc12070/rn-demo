interface IParams {
    api: string
    method: string
}

export const fetchRequest = async (params: IParams) => {
    try {
        console.log('fetchRequest request', params)
        const { api, method = 'GET' } = params
        const rslt = await fetch(api, {
            method
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
        console.error('fetchRequest error', e)
        throw e
    }
}
