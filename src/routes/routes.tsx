import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomePage from './homeScene'

const Stack = createNativeStackNavigator()

const Routes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomePage} options={{ title: 'Home' }} />
    </Stack.Navigator>
  )
}

export default Routes
