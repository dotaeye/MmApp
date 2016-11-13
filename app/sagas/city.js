import {put, take, call, fork} from 'redux-saga/effects';
import {Toast} from 'antd-mobile';
import {config} from '../common/constants';
import * as actionTypes from '../common/actionTypes'
import Request from '../utils/Request';
import FakeRequest from '../utils/FakeRequest';
import Storage from '../utils/Storage';
import jsonData from '../data/category.json';


function* getCities(payload) {
  try {
    
    const tempData = yield call(FakeRequest, jsonData, 2000);
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

export function* watchCityList() {
  while (true) {
    const {payload} = yield take(actionTypes.CITY_LIST);
    yield fork(getCities, payload);
  }
}
