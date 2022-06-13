import { applyMiddleware, createStore, combineReducers } from 'redux'
import * as reducers from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunkMiddleware from 'redux-thunk';

const appReducer = combineReducers(reducers)

export const store = createStore(appReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))