import {put, take, call, fork, select} from 'redux-saga/effects';
import {Toast} from 'antd-mobile';
import * as actionTypes from '../common/actionTypes'
import Request from '../utils/Request';
import {selectUser} from '../utils/saga';

function* getAddressList(payload) {
  try {
    const token = yield select(selectUser);
    const address = yield call(new Request().get, 'address', {
      token
    });
    yield put({
      type: actionTypes.ADDRESS_LIST_SUCCESS,
      list: address
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

function* addAddress(payload) {
  try {
    const token = yield select(selectUser);
    const address = yield call(new Request().post, 'address', {
      token,
      data: payload.data,
      formJson: true
    });
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

function* updateAddress(payload) {
  try {
    const token = yield select(selectUser);
    const address = yield call(new Request().put, 'address', {
      token,
      data: payload.data,
      formJson: true
    });
    yield put({
      type: actionTypes.UPDATE_ADDRESS_SUCCESS,
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
    const token = yield select(selectUser);
    yield call(new Request().delete, 'address/' + payload.id, {
      token
    });
    yield put({
      type: actionTypes.DELETE_ADDRESS_SUCCESS,
      id: payload.id
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

function* setDefaultAddress(payload) {
  try {
    const token = yield select(selectUser);
    yield call(new Request().put, 'address/set_default/' + payload.id, {
      token
    });
    yield put({
      type: actionTypes.SET_DEFAULT_ADDRESS_SUCCESS,
      id: payload.id
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

export function* watchUpdateAddress() {
  while (true) {
    const {payload} = yield take(actionTypes.UPDATE_ADDRESS);
    yield fork(updateAddress, payload);
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





