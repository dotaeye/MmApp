import * as actionTypes  from '../common/actionTypes';

export function searchList(payload) {
  return {
    type: actionTypes.SEARCH_LIST,
    payload
  };
}
