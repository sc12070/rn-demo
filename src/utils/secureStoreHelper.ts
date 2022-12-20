import RNSInfo from 'react-native-sensitive-info'

const get = async (key: string) =>
    await RNSInfo.getItem(key, {
        sharedPreferencesName: 'rndemoSharedPrefs'
    })

const getWithAuth = async (key: string) =>
    await RNSInfo.getItem(key, {
        sharedPreferencesName: 'rndemoSharedPrefs',
        keychainService: 'redemokcs',
        touchID: true,
        showModal: true,
        strings: {
            header: 'Sign in',
            description: 'We need your permission to retrieve stock list',
            hint: 'Touch',
            success: 'Fingerprint recognized',
            notRecognized: 'Fingerprint not recognized, try again',
            cancel: 'Cancel',
            cancelled: 'Authentication was cancelled'
        },
        kSecUseOperationPrompt: 'We need your permission to retrieve stock list'
    })

const save = async (key: string, value: string) =>
    await RNSInfo.setItem(key, value, {
        sharedPreferencesName: 'rndemoSharedPrefs',
        touchID: false,
        showModal: false
    })

const saveWithAuth = async (key: string, value: string) =>
    await RNSInfo.setItem(key, value, {
        sharedPreferencesName: 'rndemoSharedPrefs',
        keychainService: 'redemokcs',
        touchID: true,
        showModal: true,
        kSecAttrAccessible: 'kSecAttrAccessibleAfterFirstUnlock',
        kSecAccessControl: 'kSecAccessControlDevicePasscode'
    })

const remove = async (key: string) =>
    RNSInfo.deleteItem(key, {
        sharedPreferencesName: 'rndemoSharedPrefs',
        keychainService: 'redemokcs'
    })

export default { get, getWithAuth, save, saveWithAuth, remove }
