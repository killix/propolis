import { reduxReactRouter } from 'redux-router'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import createHistory from 'history/lib/createBrowserHistory'
import promiseMiddleware from 'redux-promise'
import multi from 'redux-multi'
import { compose, createStore, applyMiddleware } from 'redux'

export default function configure(reducer) {
    return compose(
        applyMiddleware(thunkMiddleware, promiseMiddleware, multi, createLogger()),
        reduxReactRouter({ createHistory })
    )(createStore)(reducer)
}
