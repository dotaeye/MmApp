import {put, take, call, fork} from 'redux-saga/effects';
import Toast from 'react-native-toast';
import * as actionTypes from '../common/actionTypes';
import Request from '../utils/Request';
import FakeRequest from '../utils/FakeRequest';
import Storage from '../utils/Storage';
import jsonData from '../data/search.json';


function* searchList(payload) {
  try {
    let results = [];
    for (var i = 0; i < 4; i++) {
      results = results.concat(jsonData);
    }
    const tempData = yield call(FakeRequest, results, 500);
    const hot = yield call(FakeRequest, jsonData, 500);
    // yield call(new Request().get, 'user/verification', {
    //  data
    // });
    yield put({
      type: actionTypes.SEARCH_LIST_SUCCESS,
      list: tempData,
      hot: hot
    });

    if (payload.success) {
      yield call(payload.success);
    }
  } catch (error) {
    if (error && error.message !== '') {
      console.log(error.message);
      // Toast.show(error.message);
    }
  }
}


export function* watchSearchList() {
  while (true) {
    const {payload} = yield take(actionTypes.SEARCH_LIST);
    yield fork(searchList, payload);
  }
}

