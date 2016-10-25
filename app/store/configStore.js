import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import ApiClient from '../utils/ApiClient';
import clientMiddleware from '../middlewares/clientMiddleware';
import commonMiddleware from '../middlewares/commonMiddleware';
import reducers from '../reducers';
const isDebuggingInBrowser = __DEV__ && !!window.navigator.userAgent;

const middlewares = [];

middlewares.push(clientMiddleware(new ApiClient()));
middlewares.push(thunk);
middlewares.push(commonMiddleware);

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger();
  middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

const store =createStoreWithMiddleware(reducers);

if (module.hot) {
  module.hot.accept(() => {
    store.replaceReducer(reducers);
  });
}

if (isDebuggingInBrowser) {
  window.store = store;
}

export default store