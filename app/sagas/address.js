import {put, take, call, fork} from 'redux-saga/effects';
import {Toast} from 'antd-mobile';
import * as actionTypes from '../common/actionTypes'
import Request from '../utils/Request';
import FakeRequest from '../utils/FakeRequest';
import Storage from '../utils/Storage';
import jsonData from '../data/addresslist.json';

function* getAddressList(payload) {
  try {

    let results = [];

    for (var i = 0; i < 5; i++) {
      results = results.concat(jsonData);
    }


    const tempData = yield call(FakeRequest, results, 2000);
    // yield call(new Request().get, 'user/verification', {
    //  data
    // });
    yield put({
      type: actionTypes.ADDRESS_LIST_SUCCESS,
      list: tempData
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

function* addAddress(payload, getState) {
  try {

    const address = yield call(FakeRequest, {}, 2000);
    // yield call(new Request().get, 'user/verification', {
    //  data
    // });
    yield put({
      type: actionTypes.ADD_ADDRESS_SUCCESS,
      address
    });
    if (payload.success) {
      yield call(payload.success);
    }
    return address;
  } catch (error) {
    if (error && error.message !== '') {
      Toast.info(error.message);
    }
  }
}

function* deleteAddress(payload) {
  try {

    const list = yield call(FakeRequest, {}, 2000);
    // yield call(new Request().get, 'user/verification', {
    //  data
    // });
    yield put({
      type: actionTypes.DELETE_ADDRESS_SUCCESS,
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

function* setDefaultAddress(payload) {
  try {

    const list = yield call(FakeRequest, {}, 2000);
    // yield call(new Request().get, 'user/verification', {
    //  data
    // });
    yield put({
      type: actionTypes.DELETE_ADDRESS_SUCCESS,
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

export function* watchGetAddressList() {
  while (true) {
    const {payload} = yield take(actionTypes.ADDRESS_LIST);
    yield fork(getAddressList, payload);
  }
}

export function* watchAddAddress() {
  while (true) {
    const {payload} = yield take(actionTypes.ADD_ADDRESS);
    yield fork(addAddress, payload);
  }
}

export function* watchDeleteAddress() {
  while (true) {
    const {payload} = yield take(actionTypes.DELETE_ADDRESS);
    yield fork(deleteAddress, payload);
  }
}

export function* watchSetDefaultAddress() {
  while (true) {
    const {payload} = yield take(actionTypes.SET_DEFAULT_ADDRESS);
    yield fork(setDefaultAddress, payload);
  }
}





