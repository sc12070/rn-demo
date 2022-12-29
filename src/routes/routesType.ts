import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { IChartInfo } from 'store/apiDataModel/home'

export type StackParamList = {
    Home: undefined
    StockDetail: {
        chartInfo: IChartInfo
    }
}

const Stack = createNativeStackNavigator<StackParamList>()

export default Stack
