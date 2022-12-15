import React from 'react'
import Stack from './routesType'
import HomeScene from './homeScene'
import StockDetailScene from './stockDetailScene'

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
