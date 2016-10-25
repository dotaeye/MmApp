import * as actionTypes  from '../common/actionTypes';

const initialState = {
  list: []
};

export default function banner(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.BANNER_LIST:
      return {
        ...state,
        loading: true
      };
    case actionTypes.BANNER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.result
      };
    case actionTypes.BANNER_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}