import React from 'react';
import { connect, Provider } from 'react-redux';
import { bindActionCreators } from 'redux';

import Account from '../views/Account'

import store from '../../utils/app/store.js';

import * as UserActions from '../state/actions/user.actions'

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div className="app-wrapper">
                    <Account />
                </div>
            </Provider>
        );
    }
}

export default App
