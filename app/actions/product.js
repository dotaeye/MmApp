import * as actionTypes  from '../common/actionTypes';

export function getProduct(id, success) {
  return {
    types: [actionTypes.PROUDCT_DETAIL, actionTypes.PROUDCT_DETAIL_SUCCESS, actionTypes.PROUDCT_DETAIL_FAIL],
    promise: (client) => client.get('/product/detail/' + id, {
      token: true
    }),
    success
  };
}

