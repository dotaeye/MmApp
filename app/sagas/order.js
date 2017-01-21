import {put, take, call, fork, select} from 'redux-saga/effects';
import {Toast} from 'antd-mobile';
import * as actionTypes from '../common/actionTypes'
import Request from '../utils/Request';
import FakeRequest from '../utils/FakeRequest';
import {selectUser} from '../utils/saga';

function* getOrderList(payload) {
  try {
    const token = yield select(selectUser);
    let list = yield call(new Request().get, 'order/list', {
      token,
      params: payload
    });
    yield put({
      type: actionTypes.ORDER_LIST_SUCCESS,
      status: payload.status,
      list: list,
      hasMore: list.totalCount > (payload.pageIndex + 1) * payload.pageSize,
      loadMore: payload.loadMore
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

export function* getOrderStatus(payload = {}) {
  try {
    const token = yield select(selectUser);
    // let status = yield call(new Request().get, 'order/status', {
    //   token
    // });
    let status = yield  call(FakeRequest, {
      10: 3,
      20: 1,
      30: 2
    }, 1000);
    yield put({
      type: actionTypes.ORDER_STATUS_SUCCESS,
      status
    });
    if (payload.success) {
      yield call(payload.success);
    }
    return status;
  } catch (error) {
    if (error && error.message !== '') {
      Toast.info(error.message);
    }
  }
}

function* addOrder(payload) {
  try {
    const token = yield select(selectUser);
    const order = yield call(new Request().post, 'order', {
      token,
      formJson: true,
      data: payload.data
    });
    yield put({
      type: actionTypes.ADD_ORDER_SUCCESS,
      order
    });

    yield put({
      type: actionTypes.DELETE_SHOP_CART_SUCCESS,
      ids: payload.data.shopCartIds
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
    const token = yield select(selectUser);
    const result = yield call(new Request().delete, 'order/' + payload.id, {
      token
    });
    yield put({
      type: actionTypes.DELETE_ORDER_SUCCESS,
      id: payload.id
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

function* cancelOrder(payload) {
  try {
    const token = yield select(selectUser);
    const result = yield call(new Request().delete, 'order/cancel/' + payload.id, {
      token
    });
    yield put({
      type: actionTypes.CANCEL_ORDER_SUCCESS,
      id: payload.id
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


function* getOrder(payload) {
  try {
    const token = yield select(selectUser);
    const order = yield call(new Request().get, 'order/' + payload.id, {
      token
    });
    yield put({
      type: actionTypes.ORDER_DETAIL_SUCCESS,
      order,
      payload: {
        id: payload.id
      }
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

export function* watchGetOrderList() {
  while (true) {
    const {payload} = yield take(actionTypes.ORDER_LIST);
    yield fork(getOrderList, payload);
  }
}


export function* watchGetOrderStatus() {
  while (true) {
    const {payload} = yield take(actionTypes.ORDER_STATUS);
    yield fork(getOrderStatus, payload);
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

export function* watchGetOrder() {
  while (true) {
    const {payload} = yield take(actionTypes.ORDER_DETAIL);
    yield fork(getOrder, payload);
  }
}




