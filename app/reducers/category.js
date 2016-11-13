import * as actionTypes  from '../common/actionTypes';

const initialState = {
  loading: false,
  list: [],
  hasLoaded: false
};

export default function category(state = initialState, action = {}) {

  switch (action.type) {
    case actionTypes.CATEGORY_LIST:
      return {
        ...state,
        loading: true
      };
    case actionTypes.CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.list,
        hasLoaded: true
      };
    case actionTypes.CATEGORY_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
}