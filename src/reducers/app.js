import { handleActions } from 'redux-actions'
import * as ACTIONS from '../constants/actions'
import { DIFFICULTY } from '../constants/trail-styles'

const createReducer = propName => (state, {payload}) => ({...state, [propName]: payload})

const DEFAULT = {
    search: null,
    location: null,
    bounds: null,
    zoom: null,
    center: null,
    trailStyle: DIFFICULTY.name,
    regionsVisibility: true,
}

const reducers = {
    [ACTIONS.CHANGE_SEARCH_TERM]: createReducer('search'),
    [ACTIONS.LOCATION_FOUND]: createReducer('location'),
    [ACTIONS.FIT_MAP_BOUNDS]: createReducer('bounds'),
    [ACTIONS.MAP_ZOOM_CHANGED]: createReducer('zoom'),
    [ACTIONS.MAP_CENTER_CHANGED]: createReducer('center'),
    [ACTIONS.CHANGE_TRAIL_STYLE]: createReducer('trailStyle'),
    [ACTIONS.CHANGE_REGIONS_VISIBILITY]: createReducer('regionsVisibility'),
}

export default handleActions(reducers, DEFAULT)
