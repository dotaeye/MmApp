import {fork} from 'redux-saga/effects';

import * as product from './product';
import * as search from './search';

export default function* rootSaga() {
  yield [
    /*user*/
    fork(product.watchProductDetail),
    fork(product.watchSearchProduct),

    fork(search.watchSearchList)
  ];
}
