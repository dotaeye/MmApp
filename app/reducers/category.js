import * as actionTypes  from '../common/actionTypes';

const initialState = {
  list: [],
  loaded: false
};

export default function category(state = initialState, action = {}) {

  switch (action.type) {
    case 'RESET_STATE':
      return {
        ...initialState
      };
    case actionTypes.CATEGORY_LIST:
      return {
        ...state,
        loading: true
      };
    case actionTypes.CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        list: action.list,
        loaded: true
      };
    case actionTypes.CATEGORY_LIST_FAIL:
      return {
        ...state,
        error: action.error
      };

    default:
      return state;
  }
}