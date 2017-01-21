import * as actionTypes  from '../common/actionTypes';
import {updateArrayItem, addArrayItem, removeArrayItem} from '../utils';

const initialState = {
  loading: false,
  list: [],
  loaded: false,
  refreshing: false
};

export default function address(state = initialState, action = {}) {

  switch (action.type) {

    case 'RESET_STATE':
      return {
        ...initialState
      };

    case actionTypes.ADDRESS_LIST:
      return {
        ...state
      };
    case actionTypes.ADDRESS_LIST_SUCCESS:
      return {
        ...state,
        list: action.list,
        loaded: true
      };
    case actionTypes.ADDRESS_LIST_FAIL:
      return {
        ...state
      };

    case actionTypes.ADD_ADDRESS:
      return {
        ...state
      };
    case actionTypes.ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        list: addArrayItem(state.list, action.address)
      };
    case actionTypes.ADD_ADDRESS_FAIL:
      return {
        ...state
      };
    case actionTypes.UPDATE_ADDRESS:
      return {
        ...state
      };
    case actionTypes.UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        list: updateArrayItem(state.list, action.address)
      };
    case actionTypes.UPDATE_ADDRESS_FAIL:
      return {
        ...state
      };


    case actionTypes.DELETE_ADDRESS:
      return {
        ...state
      };
    case actionTypes.DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        list: removeArrayItem(state.list, action.id)
      };

    case actionTypes.DELETE_ADDRESS_FAIL:
      return {
        ...state
      };

    case actionTypes.SET_DEFAULT_ADDRESS:
      return {
        ...state,
        loading: true
      };
    case actionTypes.SET_DEFAULT_ADDRESS_SUCCESS:
      return {
        ...state,
        list: updateDefaultAddress(state.list, action.id)
      };
    case actionTypes.SET_DEFAULT_ADDRESS_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}

function updateDefaultAddress(list, id) {
  list.forEach(item=> {
    item.default = item.id == id;
  });
  return list;
}