import * as actionTypes  from '../common/actionTypes';

export function getHomeList(payload) {
  return {
    type: actionTypes.HOME_LIST,
    payload
  };
}