import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configStore from './store/configStore';
import rootSaga from './sagas/index';
import App from './app';

const store = configStore();
store.runSaga(rootSaga);


export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}