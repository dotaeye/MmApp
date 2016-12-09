import {put, take, call, fork} from 'redux-saga/effects';
import {Toast} from 'antd-mobile';
import * as actionTypes from '../common/actionTypes'
import Request from '../utils/Request';
import config from '../common/config';

function* getCities(payload) {
  try {
    const city = yield call(new Request().get, 'cityCate/cascader', {
      saved: true,
      saveKey: config.city
    });
    yield put({
      type: actionTypes.CITY_LIST_SUCCESS,
      list: city
    });
    if (payload.success) {
      yield call(payload.success);
    }
    return city;
  } catch (error) {
    if (error && error.message !== '') {
      Toast.info(error.message);
    }
  }
}

export function* watchCityList() {
  while (true) {
    const {payload} = yield take(actionTypes.CITY_LIST);
    yield fork(getCities, payload);
  }
}
