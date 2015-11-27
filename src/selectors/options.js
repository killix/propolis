import { createSelector, createStructuredSelector } from 'reselect'
import { getTrailStylingProperty, getTrails, getTrailStylingColors, getRegionsVisibility } from '../getters'
import TrailOptions from '../constants/trail-styles'
import Colors from 'material-ui/lib/styles/colors'

const trailMenuItems = createSelector(
    () => [...TrailOptions].map(style => ({
        payload: style.name,
        text: style.text,
    }))
)

const trails = createSelector(
    [trailMenuItems, getTrailStylingProperty],
    (menuItems, value) => ({
        menuItems,
        value,
        floatingLabelText: 'Style by',
    })

)

export default createStructuredSelector({
    trails,
    trailStyles: getTrailStylingColors,
    regionsVisibility: getRegionsVisibility
})
