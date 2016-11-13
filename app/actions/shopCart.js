import * as actionTypes  from '../common/actionTypes';


export function getShopCartList(payload) {
  return {
    type: actionTypes.SHOP_CART_LIST,
    payload
  };
}

export function addShopCart(payload) {
  return {
    type: actionTypes.ADD_SHOP_CART,
    payload
  };
}

export function deleteShopCart(payload) {
  return {
    type: actionTypes.DELETE_SHOP_CART,
    payload
  };
}

export function updateShopCart(payload) {
  return {
    type: actionTypes.UPDATE_SHOP_CART,
    payload
  };
}

