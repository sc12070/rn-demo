import React from 'react'
import { LogBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Routes from './routes/routes'
import { Provider } from 'react-redux'
import { store } from './store/store'

LogBox.ignoreLogs(['Warning: ...'])
LogBox.ignoreAllLogs()

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Routes />
            </NavigationContainer>
        </Provider>
    )
}

export default App
