import * as actionTypes  from '../common/actionTypes';

export function getCategories() {
  return {
    types: [actionTypes.CATEGORY_LIST, actionTypes.CATEGORY_LIST_SUCCESS, actionTypes.CATEGORY_LIST_FAIL],
    promise: (client) => client.get('/banner', {
      token: true
    })
  };
}