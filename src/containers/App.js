import React, { Component, PropTypes } from 'react';
import Map from './Map';
import Search from './Search';
import OptionsPanel from './OptionsPanel';
import 'normalize.css';

const STYLES = {
    APP: {
        height: '100vh'
    }
}

export default class App extends Component {
    render() {
        return (
            <div style={STYLES.APP}>
                <Search />
                <OptionsPanel />
                <Map />
                {this.props.children}
            </div>
        )
    }
}
