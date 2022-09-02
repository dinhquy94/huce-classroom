import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import AsyncStorage from '@react-native-async-storage/async-storage'


import reducer from './reducer'
import saga from './saga'

const sagaMiddleware = createSagaMiddleware()
// @ts-ignore
const store = configureStore({
  reducer,
  middleware: [sagaMiddleware]
})

sagaMiddleware.run(saga)
export default store

export type RootState = ReturnType<typeof store.getState> // A global type to access reducers types
export type AppDispatch = typeof store.dispatch
