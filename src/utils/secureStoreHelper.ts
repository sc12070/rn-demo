import RNSInfo from 'react-native-sensitive-info'

const get = async (key: string) =>
    await RNSInfo.getItem(key, {
        sharedPreferencesName: 'rndemoSharedPrefs',
        keychainService: 'redemokcs'
    })

const getWithAuth = async (key: string) =>
    await RNSInfo.getItem(key, {
        sharedPreferencesName: 'rndemoSharedPrefs',
        keychainService: 'redemokcs',
        touchID: true,
        showModal: true,
        strings: {
            header: '',
            description: 'We need your permission to retrieve stock list'
        },
        kSecUseOperationPrompt: 'We need your permission to retrieve stock list'
    })

const save = async (key: string, value: string) =>
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

export default { get, getWithAuth, save, remove }
