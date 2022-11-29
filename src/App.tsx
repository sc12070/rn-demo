import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Routes from './routes/routes'
import { Provider } from 'react-redux'
import { store } from './store/store'

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
