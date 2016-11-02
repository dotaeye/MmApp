import * as actionTypes  from '../common/actionTypes';

export function getCarCates() {
  return {
    types: [actionTypes.CARCATE_LIST, actionTypes.CARCATE_LIST_SUCCESS, actionTypes.CARCATE_LIST_FAIL],
    promise: (client) => client.get('/banner', {
      token: true
    })
  };
}