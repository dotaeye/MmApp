import * as actionTypes  from '../common/actionTypes';

export function productDetail(payload) {
  return {
    type: actionTypes.PRODUCT_DETAIL,
    payload
  };
}


export function searchProduct(payload) {
  return {
    type: actionTypes.SEARCH_PRODUCT,
    payload
  };
}

export function getVipProduct(payload) {
  return {
    type: actionTypes.GET_VIP_PRODUCT,
    payload
  };
}

export function getVipProductDetail(payload) {
  return {
    type: actionTypes.GET_VIP_PRODUCT_DETAIL,
    payload
  };
}

export function getVipAlbumCategory(payload) {
  return {
    type: actionTypes.GET_VIP_ALBUM_CATEGORY,
    payload
  };
}

export function getVipAlbumProduct(payload) {
  return {
    type: actionTypes.GET_VIP_ALBUM_PRODUCT,
    payload
  };
}


export function getVipAlbumProductDetail(payload) {
  return {
    type: actionTypes.GET_VIP_ALBUM_PRODUCT_DETAIL,
    payload
  };
}