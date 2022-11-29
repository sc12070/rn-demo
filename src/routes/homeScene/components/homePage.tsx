import React from 'react'
import { Text, TextInput, View } from 'react-native'
import styles from './styles'
import useHomePageHooks from '../hooks/homePageHooks'

const HomePage = () => {
  const { sum, onChangeInput1, onChangeInput2 } = useHomePageHooks()

  return (
    <View style={styles.bg}>
      <TextInput style={styles.input} onChangeText={onChangeInput1} />
      <TextInput style={styles.input} onChangeText={onChangeInput2} />
      <Text>{sum}</Text>
    </View>
  )
}

export default HomePage
