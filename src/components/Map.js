import React, { PropTypes, Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'

const K = () => {}
const id = 'mapbox.streets'
const accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ'
const url = `https://api.tiles.mapbox.com/v4/${id}/{z}/{x}/{y}.png?access_token=${accessToken}`
const STYLES = {
    MAP: {
        height: '100vh'
    }
}

export default class MapComponent extends Component {
    static propTypes = {
        onLocationFound: PropTypes.func,
        onZoomChanged: PropTypes.func,
        onCenterChanged: PropTypes.func,
        zoom: PropTypes.number,
        center: PropTypes.arrayOf(PropTypes.number),
        bounds: PropTypes.object
    }
    static defaultProps = {
        zoom: 10,
        center: [49.2857409,-123.1511103],
        onLocationFound: K,
        onZoomChanged: K,
        onCenterChanged: K,
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.bounds && !nextProps.bounds.equals(this.props.bounds)) {
            this.map.fitBounds(nextProps.bounds)
        }
    }
    handleLocationFound(event) {
        this.props.onLocationFound(event.latlng)
    }
    handleZoomend(event) {
        const { target } = event

        this.props.onZoomChanged(target.getZoom())
    }
    handleMoveend(event) {
        const { target } = event

        this.props.onCenterChanged(target.getCenter())
    }
    componentDidMount() {
        this.map.locate()
    }
    get map() {
        return this.refs.map.leafletElement
    }
    render () {
        const { zoom, center, onZoomChanged, onCenterChanged } = this.props
        const props = {
            center,
            zoom,
            zoomControl: false,
            attributionControl: false,
            onLocationFound: ::this.handleLocationFound,
            onZoomend: ::this.handleZoomend,
            onDragend: ::this.handleMoveend,
        }

        return (
            <Map ref='map' style={STYLES.MAP} {...props}>
                <TileLayer {...{url}} />
                {this.props.children}
            </Map>
        )
    }
}
