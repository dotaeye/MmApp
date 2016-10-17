import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import ApiClient from '../utils/ApiClient';
import clientMiddleware from '../middlewares/clientMiddleware';
import reducers from '../reducers/index';

const middlewares = [];

middlewares.push(clientMiddleware(new ApiClient()));
middlewares.push(thunk);

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger();
  middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducers, initialState);;
}
