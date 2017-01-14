import {put, take, call, fork} from 'redux-saga/effects';
import {Toast} from 'antd-mobile';
import * as actionTypes from '../common/actionTypes';
import Request from '../utils/Request';
import FakeRequest from '../utils/FakeRequest';

function* productDetail(payload) {
  try {
    const product = yield call(new Request().get, 'product/detail/' + payload.id, {});
    yield put({
      type: actionTypes.PRODUCT_DETAIL_SUCCESS,
      product
    });
    if (payload.success) {
      yield call(payload.success);
    }
    return product;
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
      Toast.info(error.message);
    }
  }
}


function* getVipProduct(payload) {
  try {
    const list = yield call(new Request().get, 'category/list', {
      params: payload
    });
    yield put({
      type: actionTypes.GET_VIP_PRODUCT_SUCCESS,
      payload: {
        ...payload,
        hasMore: list.totalCount > (payload.pageIndex + 1) * payload.pageSize,
        list
      }
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

function* getVipProductDetail(payload) {
  try {
    const entity = yield call(new Request().get, 'product/vipDetail/' + payload.id, {
      auth: true
    });
    yield put({
      type: actionTypes.GET_VIP_PRODUCT_DETAIL_SUCCESS,
      payload: {
        entity
      }
    });

    if (payload.success) {
      yield call(payload.success);
    }
    return entity;
  } catch (error) {
    if (error && error.message !== '') {
      Toast.info(error.message);
    }
  }
}

function* getVipAlbumCategory(payload) {
  try {
    const categories = yield call(new Request().get, 'product/vipAlbumCategory', {
      params: payload
    });
    yield put({
      type: actionTypes.GET_VIP_ALBUM_CATEGORY_SUCCESS,
      albumCategory: categories
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

function* getVipAlbumProduct(payload) {
  try {
    const albumProducts = yield call(new Request().get, 'product/vipAlbumProduct', {
      params: payload
    });
    yield put({
      type: actionTypes.GET_VIP_ALBUM_PRODUCT_SUCCESS,
      albumProducts: albumProducts,
      payload: payload
    });
    if (payload.success) {
      yield call(payload.success);
    }
    return albumProducts;
  } catch (error) {
    if (error && error.message !== '') {
      Toast.info(error.message);
    }
  }
}

function* getVipAlbumProductDetail(payload) {
  try {
    const entity = yield call(new Request().get, 'product/vipAlbumDetail/' + payload.id, {
      auth: true
    });
    yield put({
      type: actionTypes.GET_VIP_ALBUM_PRODUCT_DETAIL,
      payload: {
        entity
      }
    });

    if (payload.success) {
      yield call(payload.success);
    }
    return entity;
  } catch (error) {
    if (error && error.message !== '') {
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


export function* watchGetVipProduct() {
  while (true) {
    const {payload} = yield take(actionTypes.GET_VIP_PRODUCT);
    yield fork(getVipProduct, payload);
  }
}

export function* watchGetVipProductDetail() {
  while (true) {
    const {payload} = yield take(actionTypes.GET_VIP_PRODUCT_DETAIL);
    yield fork(getVipProductDetail, payload);
  }
}

export function* watchGetVipAlbumCategory() {
  while (true) {
    const {payload} = yield take(actionTypes.GET_VIP_ALBUM_CATEGORY);
    yield fork(getVipAlbumCategory, payload);
  }
}

export function* watchGetVipAlbumProduct() {
  while (true) {
    const {payload} = yield take(actionTypes.GET_VIP_ALBUM_PRODUCT);
    yield fork(getVipAlbumProduct, payload);
  }
}

export function* watchGetVipAlbumProductDetail() {
  while (true) {
    const {payload} = yield take(actionTypes.GET_VIP_ALBUM_PRODUCT_DETAIL);
    yield fork(getVipAlbumProductDetail, payload);
  }
}
