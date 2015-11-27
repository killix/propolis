import { createSelector } from 'reselect'
import * as TYPES from '../constants/feature-types'
import TrailOptions from '../constants/trail-styles'
import Colors from 'material-ui/lib/styles/colors'

// SEARCH
export function getSearchTerm(state) {
    return state.app.search
}

// MAP
export function getLocation(state) {
    return state.app.location
}
export function getZoom(state) {
    return state.app.zoom
}
export function getCenter(state) {
    return state.app.center
}
export function getBounds(state) {
    return state.app.bounds
}
export function getRegionsVisibility(state) {
    return state.app.regionsVisibility
}
export function getTrailStylingProperty(state) {
    return state.app.trailStyle
}
export const getTrailStylingColors = createSelector(
    [getTrails, getTrailStylingProperty],
    (trails, name) => {
        const { palette } = [...TrailOptions].find(o => o.name === name);
        const values = trails.map(t => t[name]).toSet().sort().toArray();

        return new Map(values.map(type => [type, Colors[palette.get(type)]]));
    }
)


// DATA
export function getData(state) {
    return state.data
}
export function getTrails(state) {
    return getData(state).get(TYPES.TRAIL)
}
export function getRegions(state) {
    return getData(state).get(TYPES.REGION)
}

// ROUTER
export function getRouter(state) {
    return state.router
}

// FEATURE
export const getFeature = createSelector(
    [getRouter, getData],
    ({params}, data) => data.get(params.type).find(f => f.alias === params.alias)
)
