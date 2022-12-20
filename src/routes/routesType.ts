import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ChartInfoModel } from 'store/apiDataModel/home'

export type StackParamList = {
    Home: undefined
    StockDetail: {
        chartInfo: ChartInfoModel
    }
}

const Stack = createNativeStackNavigator<StackParamList>()

export default Stack
