import {put, take, call, fork} from 'redux-saga/effects';
import {Toast} from 'antd-mobile';
import {config} from '../common/constants';
import * as actionTypes from '../common/actionTypes'
import Request from '../utils/Request';
import FakeRequest from '../utils/FakeRequest';
import Storage from '../utils/Storage';
import jsonData from '../data/category.json';


function* allCategories(payload) {
  try {
    let results = [];
    results = results.concat(jsonData);
    const tempData = yield call(FakeRequest, results, 2000);
    // yield call(new Request().get, 'user/verification', {
    //  data
    // });
    yield put({
      type: actionTypes.CATEGORY_LIST_SUCCESS,
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

export function* watchCategories() {
  while (true) {
    const {payload} = yield take(actionTypes.CATEGORY_LIST);
    yield fork(allCategories, payload);
  }
}

