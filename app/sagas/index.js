import {fork} from 'redux-saga/effects';

import * as product from './product';
import * as search from './search';
import * as category from './category';
import * as carCate from './carCate';
import * as home from './home';
import * as address from './address';
import * as city from './city';
import * as order from './order'
import * as shopCart from './shopCart'
import * as user from './user';

export default function* rootSaga() {
  yield [
    /*user*/

    fork(user.watchLoginFlow),

    fork(user.watchRegisterFlow),

    fork(user.watchVerificationCodeFlow),


    /*home*/
    fork(home.watchHomeList),

    //car categories

    fork(carCate.watchGetRootCars),
    fork(carCate.watchGetChildCars),
    fork(carCate.watchGetLastCars),



    fork(product.watchProductDetail),

    fork(product.watchSearchProduct),

    fork(search.watchSearchList),

    fork(category.watchCategories),



    fork(address.watchGetAddressList),

    fork(city.watchCityList),

    fork(order.watchGetOrderList),

    fork(shopCart.watchGetShopCartList)
  ];
}
