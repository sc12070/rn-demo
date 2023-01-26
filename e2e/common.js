const OS = device.getPlatform()

export const dialogBtn = text => {
    if (OS === 'ios') {
        return element(by.label(text).and(by.type('_UIAlertControllerActionView'))).atIndex(0)
    } else {
        return element(by.text(text))
    }
}

export const goBack = async () => {
    console.log(device.OS)
    if (OS === 'ios') {
        await element(by.traits(['button']))
            .atIndex(0)
            .tap()
    } else {
        await device.pressBack()
    }
}
