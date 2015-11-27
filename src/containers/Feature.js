import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import selector from '../selectors/feature'
import Colors from 'material-ui/lib/styles/colors'
import IconButton from 'material-ui/lib/icon-button'
import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardExpandable from 'material-ui/lib/card/card-expandable'
import CardHeader from 'material-ui/lib/card/card-header'
import CardMedia from 'material-ui/lib/card/card-media'
import CardText from 'material-ui/lib/card/card-text'
import CardTitle from 'material-ui/lib/card/card-title'
import Avatar from 'material-ui/lib/avatar'
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close'
import Zoom from 'material-ui/lib/svg-icons/maps/place'
import { fitMapToFeature } from '../actions';

const actions = {
    fitMapToFeature
}
const STYLES = {
    FEATURE: {
        position: 'fixed',
        right: 0,
        bottom: 0,
        left: 0,
        opacity: 0.9,
        backgroundColor: Colors.grey100,
    },
    SUBTITLE: {
        textWrap: 'nowrop',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    ICON: {
        float: 'right',
        zoom: 0.8,
    }
}

@connect(selector, actions)
export default class FeatureContainer extends Component {
    handleCloseClick(event) {
        event.stopPropagation()
        const { location, history } = this.props
        const { query } = location

        history.pushState(null, '/', query)
    }
    handleFitClick(event) {
        const { feature } = this.props

        event.stopPropagation()

        this.props.fitMapToFeature(feature)
    }
    render () {
        const { feature } = this.props
        const { title, description, type } = feature
        const avatar = type[0].toUpperCase()

        return (
            <Card style={STYLES.FEATURE}>
                <CardHeader
                    title={title}
                    subtitle={description.substring(0, 50) + '...'}
                    avatar={<Avatar>{avatar}</Avatar>}
                    actAsExpander>
                    <IconButton style={STYLES.ICON} onClick={::this.handleCloseClick}>
                        <NavigationClose />
                    </IconButton>
                    <IconButton style={STYLES.ICON} onClick={::this.handleFitClick}>
                        <Zoom />
                    </IconButton>
                </CardHeader>
                <CardText expandable>
                    {description}
                </CardText>
            </Card>
        )
    }
}
