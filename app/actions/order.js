import * as actionTypes  from '../common/actionTypes';

export function getOrderList(payload) {
  return {
    type: actionTypes.ORDER_LIST, 
    payload
  };
}


export function addOrder(payload) {
  return {
    type: actionTypes.ADD_ORDER,
    payload
  };
}

export function getOrder(payload) {
  return {
    type: actionTypes.ORDER_DETAIL,
    payload
  };
}

export function cancelOrder(payload) {
  return {
    type: actionTypes.CANCEL_ORDER,
    payload
  };
}

export function deleteOrder(payload) {
  return {
    type: actionTypes.DELETE_ORDER,
    payload
  };
}


