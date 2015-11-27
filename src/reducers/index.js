import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import app from './app';
import data from './data';

export default combineReducers({
    router: routerStateReducer,
    app,
    data,
})
