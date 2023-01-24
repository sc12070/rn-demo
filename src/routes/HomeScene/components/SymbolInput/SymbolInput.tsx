import React from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles'
import useSymbolInputHooks from './useSymbolInputHooks'

const SymbolInput = () => {
    const { symbolInput, setSymbolInput, addStockSymbol } = useSymbolInputHooks()

    return (
        <View style={styles.rowWrapper}>
            <TextInput
                testID="symbol-input"
                style={styles.input}
                placeholder="Symbol, e.g. GOOG"
                value={symbolInput}
                onChangeText={setSymbolInput}
                clearButtonMode="always"
            />
            <TouchableOpacity
                testID="search-btn"
                style={styles.searchBtn}
                onPress={() => addStockSymbol()}>
                <Icon name="search" size={30} color="#BBB" />
            </TouchableOpacity>
        </View>
    )
}

export default SymbolInput
