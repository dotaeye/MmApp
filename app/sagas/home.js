import {put, take, call, fork} from 'redux-saga/effects';
import {Toast} from 'antd-mobile';
import * as actionTypes from '../common/actionTypes';
import Request from '../utils/Request';
import FakeRequest from '../utils/FakeRequest';
import Storage from '../utils/Storage';
import jsonData from '../data/product.json';


function* homeList(payload) {
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
      type: actionTypes.SEARCH_PRODUCT_SUCCESS,
      list: tempData,
      loadMore: payload.loadMore,
      hasMore: payload.pageIndex < 2,
      refreshing: false
    });

    if (payload.success) {
      yield call(payload.success);
    }
    return tempData;
  } catch (error) {
    if (error && error.message !== '') {
      console.log(error.message);
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

