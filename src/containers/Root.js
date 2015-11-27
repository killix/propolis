import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import configure from '../store/configure';
import reducer from '../reducers';
import { initialize } from '../actions';
import { ReduxRouter } from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';
import { Router, Route } from 'react-router';
import App from './App';
import Feature from './Feature';

const store = configure(reducer);
const { dispatch } = store;
const history = createHistory();

export default class Root extends Component {
    handleAppEnter() {
        dispatch(initialize());
    }
    render() {
        return (
            <IntlProvider locale='en'>
                <Provider {...{store}} >
                    <ReduxRouter>
                        <Route path='/' component={App} onEnter={::this.handleAppEnter} >
                            <Route path=':type/:alias' component={Feature} />
                        </Route>
                    </ReduxRouter>
                </Provider>
            </IntlProvider>
        )
    }
}
