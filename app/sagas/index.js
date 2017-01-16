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
    fork(user.watchLogoutFlow),
    fork(user.watchResetPasswordFlow),

    fork(user.watchVerificationCodeFlow),


    /*home*/
    fork(home.watchHomeList),

    //car categories

    fork(carCate.watchGetRootCars),
    fork(carCate.watchGetChildCars),
    fork(carCate.watchGetLastCars),


    fork(product.watchProductDetail),

    fork(product.watchSearchProduct),
    fork(product.watchGetVipProduct),
    fork(product.watchGetVipAlbumProduct),
    fork(product.watchGetVipAlbumCategory),
    fork(product.watchProductDetail),

    fork(search.watchSearchList),

    fork(category.watchCategories),


    //address

    fork(address.watchGetAddressList),
    fork(address.watchAddAddress),
    fork(address.watchUpdateAddress),
    fork(address.watchDeleteAddress),
    fork(address.watchSetDefaultAddress),


    fork(city.watchCityList),
    fork(order.watchGetOrderList),
    fork(order.watchGetOrderStatus),
    fork(order.watchAddOrder),
    fork(order.watchCancelOrder),
    fork(order.watchGetOrder),
    fork(order.watchDeleteOrder),

    //shopCart
    fork(shopCart.watchGetShopCartList),
    fork(shopCart.watchAddShopCart),
    fork(shopCart.watchUpdateShopCart),
    fork(shopCart.watchDeleteShopCart)
  ];
}
