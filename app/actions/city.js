import * as actionTypes  from '../common/actionTypes';

export function getCities(payload) {
  return {
    type: actionTypes.CITY_LIST,
    payload
  };
}