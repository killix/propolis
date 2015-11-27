import React, { Component, PropTypes, createElement } from 'react';
import { connect } from 'react-redux';
import selector from '../selectors/map';
import { locationFound, mapZoomChanged, mapCenterChanged } from '../actions';
import Map from '../components/Map';
import { LayerGroup, Polyline, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const actions = {
    onLocationFound: locationFound,
    onZoomChanged: mapZoomChanged,
    onCenterChanged: mapCenterChanged,
}
const WEIGHT = 5


@connect(selector, actions)
export default class MapContainer extends Component {
    static contextTypes = {
        history: PropTypes.object.isRequired,
    }
    constructor(...args) {
        super(...args)

        this.handleFeatureMouseOver = ::this.handleFeatureMouseOver
        this.handleFeatureMouseOut = ::this.handleFeatureMouseOut
    }
    handleFeatureClick(location) {
        const { history } = this.context;

        history.pushState(null, location);
    }
    handleFeatureMouseOver(event) {
        const { target } = event
        const weight = 2 * WEIGHT

        target.bringToFront().setStyle({ weight })
    }
    handleFeatureMouseOut(event) {
        const { target } = event
        const weight = WEIGHT

        target.setStyle({ weight })
    }
    renderTrailsLayer({id, features}) {
        return (
            <LayerGroup {...{id}}>
                {features.map(({location, id, ...feature}) => (
                    createElement(Polyline, {
                        key: id,
                        ...feature,
                        opacity: 1,
                        weight: WEIGHT,
                        onClick: this.handleFeatureClick.bind(this, location),
                        onMouseover: this.handleFeatureMouseOver,
                        onMouseout: this.handleFeatureMouseOut,
                    })
                ))}
            </LayerGroup>
        )
    }
    renderRegionsLayer({id, features, visible}) {
        if (!visible) {
            return null
        }

        return (
            <LayerGroup {...{id}}>
                {features.map(({location, id, ...feature}) => (
                    createElement(Polygon, {
                        key: id,
                        ...feature,
                        weight: WEIGHT / 2,
                        onClick: this.handleFeatureClick.bind(this, location),
                    })
                ))}
            </LayerGroup>
        )
    }
    render() {
        const { trails, regions, ...map } = this.props

        return (
            <Map {...map}>
                {this.renderTrailsLayer(trails)}
                {this.renderRegionsLayer(regions)}
            </Map>
        )
    }
}
