import {put, take, call, fork} from 'redux-saga/effects';
import {Toast} from 'antd-mobile';
import {config} from '../common/constants';
import * as actionTypes from '../common/actionTypes'
import Request from '../utils/Request';
import FakeRequest from '../utils/FakeRequest';
import Storage from '../utils/Storage';
import jsonData from '../data/shopCart.json';


function* getShopCartList(payload) {
  try {

    let results = [].concat(jsonData);
    const tempData = yield call(FakeRequest, results, 2000);
    // yield call(new Request().get, 'user/verification', {
    //  data
    // });
    yield put({
      type: actionTypes.SHOP_CART_LIST_SUCCESS,
      list: tempData,
      loadMore: payload.loadMore,
      hasMore: payload.pageIndex < 2,
      refreshing: false
    });
    if (payload.success) {
      yield call(payload.success);
    }
    return tempData;
  } catch (error) {
    if (error && error.message !== '') {
      Toast.info(error.message);
    }
  }
}

function* addShopCart(payload, getState) {
  try {

    const shopCartItem = yield call(FakeRequest, {}, 2000);
    // yield call(new Request().get, 'user/verification', {
    //  data
    // });
    yield put({
      type: actionTypes.ADD_SHOP_CART_SUCCESS,
      shopCartItem
    });
    if (payload.success) {
      yield call(payload.success);
    }
    return shopCartItem;
  } catch (error) {
    if (error && error.message !== '') {
      Toast.info(error.message);
    }
  }
}

function* deleteShopCart(payload) {
  try {

    const list = yield call(FakeRequest, {}, 2000);
    // yield call(new Request().get, 'user/verification', {
    //  data
    // });
    yield put({
      type: actionTypes.DELETE_SHOP_CART_SUCCESS,
      list
    });
    if (payload.success) {
      yield call(payload.success);
    }
    return list;
  } catch (error) {
    if (error && error.message !== '') {
      Toast.info(error.message);
    }
  }
}

function* updateShopCart(payload) {
  try {

    const list = yield call(FakeRequest, {}, 2000);
    // yield call(new Request().get, 'user/verification', {
    //  data
    // });
    yield put({
      type: actionTypes.DELETE_SHOP_CART_SUCCESS,
      list
    });
    if (payload.success) {
      yield call(payload.success);
    }
    return list;
  } catch (error) {
    if (error && error.message !== '') {
      Toast.info(error.message);
    }
  }
}

export function* watchGetShopCartList() {
  while (true) {
    const {payload} = yield take(actionTypes.SHOP_CART_LIST);
    yield fork(getShopCartList, payload);
  }
}

export function* watchAddShopCart() {
  while (true) {
    const {payload} = yield take(actionTypes.ADD_SHOP_CART);
    yield fork(addShopCart, payload);
  }
}

export function* watchDeleteShopCart() {
  while (true) {
    const {payload} = yield take(actionTypes.DELETE_SHOP_CART);
    yield fork(deleteShopCart, payload);
  }
}

export function* watchUpdateShopCart() {
  while (true) {
    const {payload} = yield take(actionTypes.UPDATE_SHOP_CART);
    yield fork(updateShopCart, payload);
  }
}





