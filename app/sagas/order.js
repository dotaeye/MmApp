import {put, take, call, fork} from 'redux-saga/effects';
import {Toast} from 'antd-mobile';
import * as actionTypes from '../common/actionTypes'
import Request from '../utils/Request';
import FakeRequest from '../utils/FakeRequest';
import Storage from '../utils/Storage';
import jsonData from '../data/order.json';

function* getOrderList(payload) {
  try {
    console.log('getOrderList')
    let results = [];
    for (var i = 0; i < 5; i++) {
      results = results.concat(jsonData);
    }
    const tempData = yield call(FakeRequest, results, 2000);
    // yield call(new Request().get, 'user/verification', {
    //  data
    // });
    yield put({
      type: actionTypes.ORDER_LIST_SUCCESS,
      status: payload.status,
      list: tempData,
      hasMore: payload.pageIndex < 2,
      loadMore: payload.loadMore
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

function* addOrder(payload, getState) {
  try {

    const order = yield call(FakeRequest, {}, 2000);
    // yield call(new Request().get, 'user/verification', {
    //  data
    // });
    yield put({
      type: actionTypes.ADD_ORDER_SUCCESS,
      order
    });
    if (payload.success) {
      yield call(payload.success);
    }
    return order;
  } catch (error) {
    if (error && error.message !== '') {
      Toast.info(error.message);
    }
  }
}

function* deleteOrder(payload) {
  try {

    const list = yield call(FakeRequest, {}, 2000);
    // yield call(new Request().get, 'user/verification', {
    //  data
    // });
    yield put({
      type: actionTypes.DELETE_ORDER_SUCCESS,
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

function* cancelOrder(payload) {
  try {

    yield call(FakeRequest, {}, 2000);
    // yield call(new Request().get, 'user/verification', {
    //  data
    // });
    yield put({
      type: actionTypes.CANCEL_ORDER_SUCCESS,

    });
    if (payload.success) {
      yield call(payload.success);
    }
  } catch (error) {
    if (error && error.message !== '') {
      Toast.info(error.message);
    }
  }
}

export function* watchGetOrderList() {
  while (true) {
    console.log('watchGetOrderList')
    const {payload} = yield take(actionTypes.ORDER_LIST);
    yield fork(getOrderList, payload);
  }
}

export function* watchAddOrder() {
  while (true) {
    const {payload} = yield take(actionTypes.ADD_ORDER);
    yield fork(addOrder, payload);
  }
}

export function* watchDeleteOrder() {
  while (true) {
    const {payload} = yield take(actionTypes.DELETE_ORDER);
    yield fork(deleteOrder, payload);
  }
}

export function* watchCancelOrder() {
  while (true) {
    const {payload} = yield take(actionTypes.CANCEL_ORDER);
    yield fork(cancelOrder, payload);
  }
}





