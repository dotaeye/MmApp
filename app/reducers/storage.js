import * as actionTypes  from '../common/actionTypes';

const initialState = {
  loaded: false,
  list: []
};

export default function product(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.STORAGE_LIST:
      return {
        ...state,
        loading: true
      };
    case actionTypes.STORAGE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.list,
        loaded: true
      };
    case actionTypes.STORAGE_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
