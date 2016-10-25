import * as actionTypes  from '../common/actionTypes';

const initialState = {
};

export default function product(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.PRODUCT_DETAIL:
      return {
        ...state,
        loading: true
      };
    case actionTypes.PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.result
      };
    case actionTypes.PRODUCT_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}