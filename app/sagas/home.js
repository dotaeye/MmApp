import {put, take, call, fork} from 'redux-saga/effects';
import {Toast} from 'antd-mobile';
import * as actionTypes from '../common/actionTypes';
import Request from '../utils/Request';
function* homeList(payload) {
  try {
    
    const list = yield call(new Request().get, 'app/home', {
    });
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

