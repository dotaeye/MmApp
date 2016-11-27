import {put, take, call, fork} from 'redux-saga/effects';
import {Toast} from 'antd-mobile';
import * as actionTypes from '../common/actionTypes'
import Request from '../utils/Request';

function* allCategories(payload) {
  try {
    const categories = yield call(new Request().get, 'category/all', {
    });
    yield put({
      type: actionTypes.CATEGORY_LIST_SUCCESS,
      list: categories
    });
    if (payload.success) {
      yield call(payload.success);
    }
    return categories;
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

