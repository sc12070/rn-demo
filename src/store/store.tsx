import { createStore, combineReducers } from 'redux'
import counterReducer from '../features/counter/counterSlice'

const rootReducer = combineReducers({ count: counterReducer })

const configureStore = () => createStore(rootReducer)

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
