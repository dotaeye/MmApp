import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './store/configStore';

import App from './app';

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}