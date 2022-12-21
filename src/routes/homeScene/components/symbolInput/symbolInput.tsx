import React from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles'
import useSymbolInputHooks from '../../hooks/symbolInputHooks'

const SymbolInput = () => {
    const { symbolInput, setSymbolInput, addStockSymbol } = useSymbolInputHooks()

    return (
        <View style={styles.rowWrapper}>
            <TextInput
                style={styles.input}
                placeholder="Symbol, e.g. GOOG"
                value={symbolInput}
                onChangeText={setSymbolInput}
                clearButtonMode="always"
            />
            <TouchableOpacity style={styles.searchBtn} onPress={() => addStockSymbol()}>
                <Icon name="search" size={30} color="#BBB" />
            </TouchableOpacity>
        </View>
    )
}

export default SymbolInput
