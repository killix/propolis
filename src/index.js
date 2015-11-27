import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(<Root />, document.getElementById('content'));
