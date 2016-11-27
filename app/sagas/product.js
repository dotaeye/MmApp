import {put, take, call, fork} from 'redux-saga/effects';
import {Toast} from 'antd-mobile';
import * as actionTypes from '../common/actionTypes';
import Request from '../utils/Request';
import FakeRequest from '../utils/FakeRequest';
import Storage from '../utils/Storage';
import jsonData from '../data/product.json';


function* productDetail(payload) {
  try {
    const tempData = yield call(FakeRequest, {}, 2000);
    // yield call(new Request().get, 'user/verification', {
    //  data
    // });
    yield put({
      type: actionTypes.PRODUCT_DETAIL_SUCCESS,
      product: {}
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

function* searchProduct(payload) {
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


export function* watchProductDetail() {
  while (true) {
    const {payload} = yield take(actionTypes.PRODUCT_DETAIL);
    yield fork(productDetail, payload);
  }
}


export function* watchSearchProduct() {
  while (true) {
    const {payload} = yield take(actionTypes.SEARCH_PRODUCT);
    yield fork(searchProduct, payload);
  }
}

