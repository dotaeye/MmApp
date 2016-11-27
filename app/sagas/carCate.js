import {put, take, call, fork} from 'redux-saga/effects';
import {Toast} from 'antd-mobile';
import * as actionTypes from '../common/actionTypes'
import Request from '../utils/Request';
import FakeRequest from '../utils/FakeRequest';

function* getRootCars(payload) {
  try {
    const rootCars = yield call(new Request().get, 'carcate/select', {
      params: {
        level: 1
      }
    });
    yield put({
      type: actionTypes.CARCATE_LIST_SUCCESS,
      rootCars: rootCars
    });
    if (payload.success) {
      yield call(payload.success);
    }
    return rootCars;
  } catch (error) {
    if (error && error.message !== '') {
      Toast.info(error.message);
    }
  }
}

function* getChildCars(payload) {
  try {
    const childCars = yield call(new Request().get, 'carcate/all/' + payload.id, {});
    yield put({
      type: actionTypes.CARCATE_LIST_CHILD_SUCCESS,
      selectName: payload.selectName,
      childCars: childCars
    });
    if (payload.success) {
      yield call(payload.success);
    }
    return childCars;
  } catch (error) {
    if (error && error.message !== '') {
      Toast.info(error.message);
    }
  }
}


function* getLastCars(payload) {
  try {
    const lastCars = yield call(new Request().get, 'carcate/select', {
      params: {
        level: 4,
        parentId: payload.id
      }
    });
    yield put({
      type: actionTypes.CARCATE_LIST_LAST_SUCCESS,
      selectName: payload.selectName,
      lastCars: lastCars
    });
    if (payload.success) {
      yield call(payload.success);
    }
    return lastCars;
  } catch (error) {
    if (error && error.message !== '') {
      Toast.info(error.message);
    }
  }
}

function* selectCar(payload, getState) {
  try {
    const myCars = getState().carCate.myCars;
    const isExist = myCars.filter(car=>car.id === payload.id).length > 0;
    if (isExist) {
      Toast.info('已添加了该车');
      return;
    }
    const car = yield call(FakeRequest, {}, 2000);
    // yield call(new Request().get, 'user/verification', {
    //  data
    // });
    yield put({
      type: actionTypes.SELECT_CAR_SUCCESS,
      car
    });
    if (payload.success) {
      yield call(payload.success);
    }
    return car;
  } catch (error) {
    if (error && error.message !== '') {
      Toast.info(error.message);
    }
  }
}

function* deleteCar(payload) {
  try {

    const myCars = yield call(FakeRequest, {}, 2000);
    // yield call(new Request().get, 'user/verification', {
    //  data
    // });
    yield put({
      type: actionTypes.DELETE_CAR_SUCCESS,
      myCars
    });
    if (payload.success) {
      yield call(payload.success);
    }
    return myCars;
  } catch (error) {
    if (error && error.message !== '') {
      Toast.info(error.message);
    }
  }
}

function* setDefaultCar(payload) {
  try {

    const myCars = yield call(FakeRequest, {}, 2000);
    // yield call(new Request().get, 'user/verification', {
    //  data
    // });
    yield put({
      type: actionTypes.DELETE_CAR_SUCCESS,
      myCars
    });
    if (payload.success) {
      yield call(payload.success);
    }
    return myCars;
  } catch (error) {
    if (error && error.message !== '') {
      Toast.info(error.message);
    }
  }
}

function* getMyCars(payload) {
  try {

    const myCars = yield call(FakeRequest, {}, 2000);
    // yield call(new Request().get, 'user/verification', {
    //  data
    // });
    yield put({
      type: actionTypes.GET_MY_CAR_LIST_SUCCESS,
      myCars
    });
    if (payload.success) {
      yield call(payload.success);
    }
    return myCars;
  } catch (error) {
    if (error && error.message !== '') {
      Toast.info(error.message);
    }
  }
}

export function* watchGetRootCars() {
  while (true) {
    const {payload} = yield take(actionTypes.CARCATE_LIST);
    yield fork(getRootCars, payload);
  }
}

export function* watchGetChildCars() {
  while (true) {
    const {payload} = yield take(actionTypes.CARCATE_LIST_CHILD);
    yield fork(getChildCars, payload);
  }
}

export function* watchGetLastCars() {
  while (true) {
    const {payload} = yield take(actionTypes.CARCATE_LIST_LAST);
    yield fork(getLastCars, payload);
  }
}

export function* watchSelectCar() {
  while (true) {
    const {payload} = yield take(actionTypes.SELECT_CAR);
    yield fork(selectCar(), payload);
  }
}

export function* watchDeleteCar() {
  while (true) {
    const {payload} = yield take(actionTypes.DELETE_CAR);
    yield fork(deleteCar, payload);
  }
}

export function* watchSetDefaultCar() {
  while (true) {
    const {payload} = yield take(actionTypes.SET_DEFAULT_CAR);
    yield fork(setDefaultCar, payload);
  }
}

export function* watchGetMyCars() {
  while (true) {
    const {payload} = yield take(actionTypes.GET_MY_CAR_LIST);
    yield fork(getMyCars, payload);
  }
}



