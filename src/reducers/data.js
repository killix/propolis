import { handleActions } from 'redux-actions';
import * as ACTIONS from '../constants/actions';
import Immutable from 'immutable';
import {ALL as ALL_TYPES, TRAIL, REGION} from '../constants/feature-types';

function dataOf(action) {
    return new Immutable.Map(action.payload.data.data.map(f => [f.id, f]))
}

const createReducer = type => (state, action) => state.set(type, dataOf(action))

const reducers = {
    [ACTIONS.FETCH_TRAILS]: createReducer(TRAIL),
    [ACTIONS.FETCH_REGIONS]: createReducer(REGION),
}

const DEFAULT = new Immutable.Map(ALL_TYPES.map(type => [type, new Immutable.Map()]))

export default handleActions(reducers, DEFAULT)
