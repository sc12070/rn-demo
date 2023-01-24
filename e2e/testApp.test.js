describe('Example', () => {
    beforeAll(async () => {
        await device.launchApp()
    })

    beforeEach(async () => {})

    test('valid symbol', async () => {
        const symbol = 'AAPL'
        await element(by.id('symbol-input')).typeText(symbol)
        await element(by.id('search-btn')).tap()
        await expect(element(by.text(symbol))).toExist()
        await device.takeScreenshot('detail_page')
        await element(by.traits(['button']))
            .atIndex(0)
            .tap()
        await device.takeScreenshot('home_with_symbol_aapl')
    })

    test('remove symbol', async () => {
        const symbol = 'AAPL'
        await element(by.id(`stock-item-${symbol}`)).swipe('left')
        await element(by.id(`stock-item-${symbol}-del`)).tap()
    })

    test('non-exist symbol', async () => {
        const symbol = 'AAPLL'
        const textInput = element(by.id('symbol-input'))
        await textInput.typeText(symbol)
        await element(by.id('search-btn')).tap()
        await expect(element(by.text(`Equity with symbol '${symbol}' not found`))).toExist()
        await device.takeScreenshot('not_found')
        await element(by.label('OK').and(by.type('_UIAlertControllerActionView')))
            .atIndex(0)
            .tap()
        await textInput.clearText()
    })

    test('non-equity symbol', async () => {
        const symbol = 'APPL'
        const textInput = element(by.id('symbol-input'))
        await textInput.typeText(symbol)
        await element(by.id('search-btn')).tap()
        await expect(element(by.text('Sorry', 'We only support equity now'))).toExist()
        await device.takeScreenshot('non_equity')
        await element(by.label('OK').and(by.type('_UIAlertControllerActionView')))
            .atIndex(0)
            .tap()
        await textInput.clearText()
    })
})
