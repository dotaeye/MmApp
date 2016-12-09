import {put, take, call, fork} from 'redux-saga/effects';
import {Toast} from 'antd-mobile';
import * as actionTypes from '../common/actionTypes';
import Request from '../utils/Request';

function* storageList(payload) {
  try {
    const list = yield call(new Request().get, 'category/list', {
      params: payload
    });
    yield put({
      type: actionTypes.SEARCH_PRODUCT_SUCCESS,
      list: list,
      loadMore: payload.loadMore,
      hasMore: list.totalCount > (payload.pageIndex + 1) * payload.pageSize
    });

    if (payload.success) {
      yield call(payload.success);
    }
    return list;
  } catch (error) {
    if (error && error.message !== '') {
      console.log(error.message);
      Toast.info(error.message);
    }
  }
}

export function* watchStorageList() {
  while (true) {
    const {payload} = yield take(actionTypes.STORAGE_LIST);
    yield fork(storageList, payload);
  }
}

