import {put, take, call, fork} from 'redux-saga/effects';
import {Toast} from 'antd-mobile';
import moment from 'moment';
import * as actionTypes from '../common/actionTypes';
import Request from '../utils/Request';
import config from '../common/config';
import Storage from '../utils/Storage';
import {getShopCartList} from './shopCart';
import {getOrderStatus} from './order';

function* homeList(payload) {
  try {
    let isLogined = false;
    const user = yield call(Storage.get, config.token);
    if (user && moment().isBefore(new Date(user['.expires']))) {
      yield put({
        type: actionTypes.LOGIN_SUCCESS,
        user
      });
      isLogined = true;
    }
    const apiCalls = [];
    apiCalls.push(call(new Request().get, 'app/home', {}));
    if (isLogined) {
      apiCalls.push(call(getShopCartList));
      apiCalls.push(call(getOrderStatus));
    }
    const [list]=yield apiCalls;
    yield put({
      type: actionTypes.HOME_LIST_SUCCESS,
      list: list,
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


export function* watchHomeList() {
  while (true) {
    const {payload} = yield take(actionTypes.HOME_LIST);
    yield fork(homeList, payload);
  }
}

