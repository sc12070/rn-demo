import EncryptedStorage from 'react-native-encrypted-storage'

const get = async (key: string) => await EncryptedStorage.getItem(key)

const getWithAuth = async (key: string) => {
    console.warn('Auth is not availible in react-native-encrypted-storage')
    return await EncryptedStorage.getItem(key)
}

const save = async (key: string, value: string) => await EncryptedStorage.setItem(key, value)

const remove = async (key: string) => EncryptedStorage.removeItem(key)

export default { get, getWithAuth, save, remove }
