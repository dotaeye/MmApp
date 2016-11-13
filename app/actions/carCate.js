import * as actionTypes  from '../common/actionTypes';

export function getCarCates(payload) {
  return {
    type: actionTypes.CARCATE_LIST,
    payload
  };
}

export function getMyCars(payload) {
  return {
    type: actionTypes.GET_MY_CAR_LIST,
    payload
  };
}

export function selectCar(payload) {
  return {
    type: actionTypes.SELECT_CAR,
    payload
  };
}


export function deleteCar(payload) {
  return {
    type: actionTypes.DELETE_CAR,
    payload
  };
}

export function setDefaultCar(payload) {
  return {
    type: actionTypes.SET_DEFAULT_CAR,
    payload
  };
}

