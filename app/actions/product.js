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
