import React from 'react'
import { ScrollView, Text, TextInput, View } from 'react-native'
import styles from './styles'
import useHomePageHooks from '../hooks/homePageHooks'

const HomePage = () => {
  const { sum, onChangeInput1, onChangeInput2 } = useHomePageHooks()

  return (
    <ScrollView keyboardShouldPersistTaps="handled" bounces={false}>
      <View style={styles.bg}>
        <TextInput style={styles.input} keyboardType="number-pad" onChangeText={onChangeInput1} />
        <TextInput style={styles.input} keyboardType="numeric" onChangeText={onChangeInput2} />
        <Text>{sum}</Text>
      </View>
    </ScrollView>
  )
}

export default HomePage
