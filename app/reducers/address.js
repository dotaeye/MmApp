import * as actionTypes  from '../common/actionTypes';

const initialState = {
  loading: false,
  list: [],
  hasLoaded: false
};

export default function address(state = initialState, action = {}) {

  switch (action.type) {
    case actionTypes.ADDRESS_LIST:
      return {
        ...state,
        loading: true
      };
    case actionTypes.ADDRESS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.list,
        hasLoaded: true
      };
    case actionTypes.ADDRESS_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case actionTypes.ADD_ADDRESS:
      return {
        ...state,
        loading: true
      };
    case actionTypes.ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: state.list.push(action.address)
      };
    case actionTypes.ADD_ADDRESS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case actionTypes.DELETE_ADDRESS:
      return {
        ...state,
        loading: true
      };
    case actionTypes.DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.list
      };

    case actionTypes.DELETE_ADDRESS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case actionTypes.SET_DEFAULT_ADDRESS:
      return {
        ...state,
        loading: true
      };
    case actionTypes.SET_DEFAULT_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.list
      };
    case actionTypes.SET_DEFAULT_ADDRESS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
