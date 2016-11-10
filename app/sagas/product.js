import {put, take, call, fork} from 'redux-saga/effects';
import Toast from 'react-native-toast';
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
      Toast.show(error.message);
    }
  }
}

function* searchProduct(payload) {
  try {

    console.log(payload);

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
      // Toast.show(error.message);
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

