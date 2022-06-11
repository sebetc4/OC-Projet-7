import { applyMiddleware, createStore, combineReducers } from 'redux'
import { app, posts, todos, user, usersFollowed } from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunkMiddleware from 'redux-thunk';

const appReducer = combineReducers({
    app,
    posts, 
    todos, 
    usersFollowed,
    user
})

export const store = createStore(appReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))