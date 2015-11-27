import { createSelector, createStructuredSelector } from 'reselect'
import {
    getTrails,
    getRegions,
    getBounds,
    getTrailStylingProperty,
    getTrailStylingColors,
    getRegionsVisibility
} from '../getters'
import Colors from 'material-ui/lib/styles/colors'

const trails = createSelector(
    [getTrails, getTrailStylingProperty, getTrailStylingColors],
    (trails, name, colors) => ({
        id: 'trails',
        features: trails.map(trail => ({
            id: trail.id,
            visible: true,
            positions: trail.coordinates,
            location: `/${trail.type}/${trail.alias}`,
            color: colors.get(trail[name])
        })),
    })
)

const regions = createSelector(
    [getRegions, getRegionsVisibility],
    (regions, visible) => ({
        id: 'regions',
        visible,
        features: regions.map(region => ({
            id: region.id,
            location: `/${region.type}/${region.alias}`,
            positions: region.coordinates,
            color: Colors.amber500
        })),
    })
)

export default createStructuredSelector({
    trails,
    regions,
    bounds: getBounds
})
