import {put, take, call, fork} from 'redux-saga/effects';
import {Toast} from 'antd-mobile';
import {config} from '../common/constants';
import * as actionTypes from '../common/actionTypes'
import Request from '../utils/Request';
import FakeRequest from '../utils/FakeRequest';
import Storage from '../utils/Storage';
import jsonData from '../data/category.json';


function* getCarCategories(payload) {
  try {

    let results = [];

    for (var i = 0; i < 10; i++) {
      results = results.concat(jsonData);
    }

    const tempData = yield call(FakeRequest, results, 2000);
    // yield call(new Request().get, 'user/verification', {
    //  data
    // });
    yield put({
      type: actionTypes.CARCATE_LIST_SUCCESS,
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

export function* watchCarCategories() {
  while (true) {
    const {payload} = yield take(actionTypes.CARCATE_LIST);
    yield fork(getCarCategories, payload);
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



