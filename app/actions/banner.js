import * as actionTypes  from '../common/actionTypes';

export function getBanners() {
  return {
    types: [actionTypes.BANNER_LIST, actionTypes.BANNER_LIST_SUCCESS, actionTypes.BANNER_LIST_FAIL],
    promise: (client) => client.get('/banner', {
      token: true
    })
  };
}