import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type StackParamList = {
    Home: undefined
    StockDetail: {
        symbol: string
    }
}

const Stack = createNativeStackNavigator<StackParamList>()

export default Stack
