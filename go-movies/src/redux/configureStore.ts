// redux/configureStore.ts
import { createStore } from 'redux'
import { setJWTReducer } from './reducers/setJWTReducer'

export const configureStore = () => createStore(setJWTReducer)
