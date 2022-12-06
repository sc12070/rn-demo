import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScene from './homeScene'
import StockDetailScene from './stockDetailScene'

const Stack = createNativeStackNavigator()

const Routes = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScene} options={{ title: 'Home' }} />
            <Stack.Screen
                name="StockDetail"
                component={StockDetailScene}
                options={{ title: 'Detail' }}
            />
        </Stack.Navigator>
    )
}

export default Routes
