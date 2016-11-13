import {fork} from 'redux-saga/effects';

import * as product from './product';
import * as search from './search';
import * as category from './category';
import * as home from './home';

export default function* rootSaga() {
  yield [
    /*user*/
    fork(product.watchProductDetail),
    fork(product.watchSearchProduct),

    fork(search.watchSearchList),


    fork(category.watchCategories),

    fork(home.watchHomeList)
  ];
}
