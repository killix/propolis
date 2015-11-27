import { createAction } from 'redux-actions'
import * as ACTIONS from '../constants/actions'
import trails from '../dao/trails'
import regions from '../dao/regions'
import { getData } from '../getters'
import L from 'leaflet'

export function initialize() {
    return [fetchTrails(), fetchRegions()]
}

// DATA FETCHING
export const fetchTrails = createAction(ACTIONS.FETCH_TRAILS, trails.fetch)
export const fetchRegions = createAction(ACTIONS.FETCH_REGIONS, regions.fetch)

// SEARCH
export const changeSearchTerm = createAction(ACTIONS.CHANGE_SEARCH_TERM)

// MAP
export const locationFound = createAction(ACTIONS.LOCATION_FOUND)
export const fitMapBounds = createAction(ACTIONS.FIT_MAP_BOUNDS)
export const mapZoomChanged = createAction(ACTIONS.MAP_ZOOM_CHANGED)
export const mapCenterChanged = createAction(ACTIONS.MAP_CENTER_CHANGED)
export const changeTrailStyle = createAction(ACTIONS.CHANGE_TRAIL_STYLE)
export const changeRegionsVisibility = createAction(ACTIONS.CHANGE_REGIONS_VISIBILITY)

// FEATURE
export function fitMapToFeature({type, alias, coordinates}) {
    return (dispatch, getState) => {
        if (!coordinates) {
            const state = getState()
            const features = getData(state).get(type)
            const feature = features.find(f => f.alias === alias)
            coordinates = feature.coordinates
        }

        dispatch(fitMapBounds(L.latLngBounds(coordinates)))
    }
}
