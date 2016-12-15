import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import Reducer from './reducers'

import App from './app'
import {currentState} from './actions'

const logger = createLogger()

let store = createStore(Reducer, applyMiddleware(thunkMiddleware))
// let store = createStore(Reducer)
currentState()(store.dispatch)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)
