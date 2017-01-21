import * as actionTypes  from '../common/actionTypes';

const initialState = {
  loading: false,
  list: []
};

export default function city(state = initialState, action = {}) {

  switch (action.type) {
    case 'RESET_STATE':
      return {
        ...initialState
      };
    case actionTypes.CITY_LIST:
      return {
        ...state,
        loading: true
      };
    case actionTypes.CITY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.list,
        loaded: true
      };
    case actionTypes.CITY_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
}
