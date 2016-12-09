import {put, take, call, fork, select} from 'redux-saga/effects';
import {Toast} from 'antd-mobile';
import * as actionTypes from '../common/actionTypes'
import Request from '../utils/Request';
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

function* addOrder(payload) {
  try {
    const token = yield select(state=>state.user.user.access_token);
    const order = yield call(new Request().post, 'order', {
      token,
      formJson: true,
      data: payload.data
    });
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
    const token = yield select(state=>state.user.user.access_token);
    const result = yield call(new Request().delete, 'order/' + payload.id, {
      token
    });
    yield put({
      type: actionTypes.DELETE_SHOP_CART_SUCCESS,
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

    //yield call(FakeRequest, {}, 2000);
    // yield call(new Request().get, 'user/verification', {
    //  data
    // });
    yield put({
      type: actionTypes.CANCEL_ORDER_SUCCESS
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





