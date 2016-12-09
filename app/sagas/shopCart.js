import {put, take, select, call, fork} from 'redux-saga/effects';
import {Toast} from 'antd-mobile';
import * as actionTypes from '../common/actionTypes'
import Request from '../utils/Request';

function* getShopCartList(payload) {
  try {
    const token = yield select(state=>state.user.user.access_token);
    let list = yield call(new Request().get, 'shoppingCartItem', {
      token
    });
    yield put({
      type: actionTypes.SHOP_CART_LIST_SUCCESS,
      list: list
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

function* addShopCart(payload) {
  try {
    const token = yield select(state=>state.user.user.access_token);
    const shopCartItem = yield call(new Request().post, 'shoppingCartItem', {
      token,
      formJson: true,
      data: payload.data
    });
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

    const token = yield select(state=>state.user.user.access_token);
    const result = yield call(new Request().delete, 'shoppingCartItem', {
      token,
      formJson: true,
      data: {
        ids: payload.ids
      }
    });
    yield put({
      type: actionTypes.DELETE_SHOP_CART_SUCCESS,
      ids: payload.ids
    });
    if (payload.success) {
      yield call(payload.success);
    }
    return result;
  } catch (error) {
    if (error && error.message !== '') {
      Toast.info(error.message);
    }
  }
}

function* updateShopCart(payload) {
  try {
    const token = yield select(state=>state.user.user.access_token);
    const shopCartItem = yield call(new Request().post, 'shoppingCartItem/update', {
      token,
      formJson: true,
      data: payload
    });
    yield put({
      type: actionTypes.UPDATE_SHOP_CART_SUCCESS,
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





