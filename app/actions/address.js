import * as actionTypes  from '../common/actionTypes';


export function getAddressList(payload) {
  return {
    type: actionTypes.ADDRESS_LIST,
    payload
  };
}

export function addAddress(payload) {
  return {
    type: actionTypes.ADD_ADDRESS,
    payload
  };
}


export function deleteAddress(payload) {
  return {
    type: actionTypes.DELETE_ADDRESS,
    payload
  };
}

export function setDefaultAddress(payload) {
  return {
    type: actionTypes.SET_DEFAULT_ADDRESS,
    payload
  };
}

