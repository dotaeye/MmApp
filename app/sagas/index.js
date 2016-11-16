import {fork} from 'redux-saga/effects';

import * as product from './product';
import * as search from './search';
import * as category from './category';
import * as home from './home';
import * as address from './address';
import * as city from './city';
import * as order from './order'
import * as shopCart from './shopCart'

export default function* rootSaga() {
  yield [
    /*user*/
    fork(product.watchProductDetail),

    fork(product.watchSearchProduct),

    fork(search.watchSearchList),

    fork(category.watchCategories),

    fork(home.watchHomeList),

    fork(address.watchGetAddressList),

    fork(city.watchCityList),

    fork(order.watchGetOrderList),

    fork(shopCart.watchGetShopCartList)
  ];
}
